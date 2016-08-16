var pg = require('pg');
var url = require('url');
var config={};

if(process.env.DATABASE_URL != undefined) {
  var params = url.parse(process.env.DATABASE_URL);
  var auth = params.auth ? params.auth.split(':') : [null, null];
  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: process.env.SSL
  };
  } else {
    config = {
      database: 'solo-cigar',
      port: 5432,
      idleTimeoutMills: 30000
   };
}
// var config = {
//   database: 'solo-cigar',
//   port: 5432,
//   idleTimeoutMills: 30000
// };

var pool = new pg.Pool(config);

function create(data, callback){
  // var sendData = {};
  console.log('/models/cigar.js', data);
  pool.connect(function(err, client, done){
    if(err){
      done();
      return callback(err);
    }

    // client.query('INSERT INTO cigars (brand, name, origin, wrapper_color, wrapper_country, filler, body) VALUES ($1, $2, $3, $4, $5, $6, $7);',
    // [data.brand, data.name, data.origin.country, data.wrapperColor, data.wrapperCountry, data.filler, data.body],
    client.query('INSERT INTO cigars (brand_id, name, body_id, wrapper_color_id, wrapper_country_id) VALUES '
    + '((SELECT brand_id FROM brand WHERE brand.brand = $1), '
    + '$2, (SELECT wrapper_color_id FROM wrapper_color WHERE wrapper_color.name = $3), '
    + '(SELECT wrapper_country_id FROM wrapper_country LEFT JOIN country ON wrapper_country.country_id = country.id WHERE country.country = $4));',
    [data.brand, data.name, data.body, data.origin.country, data.wrapperColor, data.wrapperCountry], function(err, result){
      if(err){
        done();
        return callback(err);
      }
      else{
        callback(null, result.rows[0]);
        done();
      }
    });
  });
};

function getCigarList(callback){
  var sendData = {};

  pool.connect(function(err, client, done){
    if(err){
      done();
      return callback(err);
    }

    // client.query('SELECT cigars.id as id, string_agg(brand.brand, ' '), cigars.name, string_agg(body.name, ' ') as body, '
    // + 'string_agg(wrapper_color.name, ' ') as wrapper_color_name, string_agg(wrapper_color.description, ' ') as wrapper_color_description, '
    // + 'string_agg(country.country, ' ') as origin_country, string_agg(wrapper.country, ' ') as wrapper_country, '
    // + 'string_agg(c_f.country, ' ') as filler_country '
    // + 'FROM cigars '
    // + 'LEFT OUTER JOIN body ON cigars.body_id = body.id '
    // + 'LEFT OUTER JOIN wrapper_color ON cigars.wrapper_color_id = wrapper_color.id '
    // + 'LEFT OUTER JOIN brand ON cigars.brand_id = brand.id '
    // + 'LEFT OUTER JOIN origin ON cigars.origin_id = origin.id '
    // + 'LEFT JOIN country ON origin.country_id = country.id '
    // + 'LEFT JOIN wrapper_country ON cigars.wrapper_country_id = wrapper_country.id '
    // + 'LEFT JOIN country as wrapper ON wrapper_country.country_id = wrapper.id '
    // + 'LEFT JOIN filler_combo ON filler_combo.cigars_id = cigars.id '
    // + 'LEFT JOIN filler ON filler_combo.filler_id = filler.id '
    // + 'LEFT JOIN country as c_f ON filler.country_id = c_f.id '
    // + 'GROUP BY cigar.id ORDER BY cigars.id;',
    client.query('SELECT cigars.id as id, brand.brand, cigars.name, body.name as body, '
    + 'wrapper_color.name as wrapper_color_name, wrapper_color.description as wrapper_color_description, '
    + 'country.country as origin_country, wrapper.country as wrapper_country, '
    + ' c_f.country as filler_country '
    + 'FROM cigars '
    + 'LEFT OUTER JOIN body ON cigars.body_id = body.id '
    + 'LEFT OUTER JOIN wrapper_color ON cigars.wrapper_color_id = wrapper_color.id '
    + 'LEFT OUTER JOIN brand ON cigars.brand_id = brand.id '
    + 'LEFT OUTER JOIN origin ON cigars.origin_id = origin.id '
    + 'LEFT JOIN country ON origin.country_id = country.id '
    + 'LEFT JOIN wrapper_country ON cigars.wrapper_country_id = wrapper_country.id '
    + 'LEFT JOIN country as wrapper ON wrapper_country.country_id = wrapper.id '
    + 'LEFT JOIN filler_combo ON filler_combo.cigars_id = cigars.id '
    + 'LEFT JOIN filler ON filler_combo.filler_id = filler.id '
    + 'LEFT JOIN country as c_f ON filler.country_id = c_f.id '
    + 'ORDER BY cigars.id;',
    function(err, result){
      sendData = result.rows;
      // console.log(sendData);
      if(err){
        console.log('query err', err);
        done();
        return callback(err);
      }
      else{
        // console.log(sendData);
        return callback(null, sendData);
      }
    });
  });
};

function getArrayList(callback){
  var sendData = {};

  pool.connect(function(err, client, done){
    if(err){
      done();
      return callback(err);
    }

    client.query('SELECT gauges.id as id, gauges.number as gauge_number, '
    + 'sizes.number as sizes_number, wrapper_color.name as wrapper_color_name, '
    + 'wrapper_color.description as wrapper_color_description, wrapper_country.country_id as wrapper_country_id, '
    + 'country.country as wrapper_country, c.country as all_country, filler.country_id as filler_country_id, '
    + 'c_f.country as filler_country, c_o.id as origin_country_id, c_o.country as origin_country, '
    + 'body.name as body '
    + 'FROM gauges '
    + 'FULL OUTER JOIN sizes ON gauges.id = sizes.id '
    + 'FULL OUTER JOIN wrapper_color ON gauges.id = wrapper_color.id '
    + 'FULL OUTER JOIN wrapper_country ON gauges.id = wrapper_country.id '
    + 'LEFT JOIN country ON wrapper_country.country_id = country.id '
    + 'FULL OUTER JOIN country as c ON gauges.id = c.id '
    + 'FULL OUTER JOIN filler ON gauges.id = filler.id '
    + 'LEFT JOIN country as c_f ON filler.country_id = c_f.id '
    + 'FULL OUTER JOIN origin ON gauges.id = origin.id '
    + 'LEFT JOIN country as c_o ON origin.country_id = c_o.id '
    + 'FULL OUTER JOIN body ON gauges.id = body.id '
    + 'ORDER BY id;',
    function(err, result){
      sendData = result.rows;
      if(err){
        console.log('query err', err);
        done();
        return callback(err);
      }
      else{
        return callback(null, sendData);
      }
    });
  });
};

function getUserCigars(user, callback){
  var sendData = {};

  pool.connect(function(err, client, done){
    if(err){
      done();
      return callback(err);
    }

    client.query('SELECT users_cigars.id, users_cigars.cigars_id, users_cigars.users_id, '
    + 'brand.brand, cigars.name, users_cigars.date, users_cigars.quantity, sizes.number as size, '
    + 'gauges.number as gauge, body.name as body, '
    + 'wrapper_color.name as wrapper_color_name, wrapper_color.description as wrapper_color_description, '
    + 'country.country as origin_country, wrapper.country as wrapper_country, '
    + 'c_f.country as filler_country, users_cigars.condition, users_cigars.comments '
    + 'FROM users_cigars '
    + 'LEFT JOIN users ON users_cigars.users_id = users.id '
    + 'LEFT JOIN cigars ON users_cigars.cigars_id = cigars.id '
    + 'LEFT JOIN sizes ON users_cigars.sizes_id = sizes.id '
    + 'LEFT JOIN gauges ON users_cigars.gauges_id = gauges.id '
    + 'LEFT OUTER JOIN body ON cigars.body_id = body.id '
    + 'LEFT OUTER JOIN wrapper_color ON cigars.wrapper_color_id = wrapper_color.id '
    + 'LEFT OUTER JOIN brand ON cigars.brand_id = brand.id '
    + 'LEFT OUTER JOIN origin ON cigars.origin_id = origin.id '
    + 'LEFT JOIN country ON origin.country_id = country.id '
    + 'LEFT JOIN wrapper_country ON cigars.wrapper_country_id = wrapper_country.id '
    + 'LEFT JOIN country as wrapper ON wrapper_country.country_id = wrapper.id '
    + 'LEFT JOIN filler_combo ON filler_combo.cigars_id = cigars.id '
    + 'LEFT JOIN filler ON filler_combo.filler_id = filler.id '
    + 'LEFT JOIN country as c_f ON filler.country_id = c_f.id '
    + 'WHERE users.id = $1  ORDER BY cigars.id;', [user.id], function(err, result){
      sendData = result.rows;

      if(err){
        console.log('query err', err);
        done();
        return callback(err);
      }
      else{
        return callback(null, sendData);
      }
    });
  });
};

function createAndAdd(data, callback){
  console.log('/models/cigar.js', data);
  pool.connect(function(err, client, done){
    if(err){
      done();
      return callback(err);
    }

    // client.query('INSERT INTO cigars (brand, name, origin, wrapper_color, wrapper_country, filler, body) VALUES ($1, $2, $3, $4, $5, $6, $7);',
    // [data.brand, data.name, data.origin.country, data.wrapperColor, data.wrapperCountry, data.filler, data.body],
    client.query('WITH new AS (INSERT INTO cigars (brand_id, name, body_id, '
    + 'origin_id, wrapper_color_id, wrapper_country_id) VALUES ($1, $2, '
    + '$3, $4, $5, $6) RETURNING id) INSERT INTO users_cigars (users_id, '
    + 'cigars_id, date, quantity, sizes_id, gauges_id, condition, comments) '
    + 'VALUES ($7, (SELECT new.id from new), $8, $9, $10, $11, $12, $13);',
    [data.brand.id, data.name.name, data.body.id, data.origin.id,
      data.wrapperColor.id, data.wrapperCountry.id, data.user.id, data.date,
    data.quantity, data.size, data.gauge, data.condition, data.comments],
    function(err, result){
      if(err){
        done();
        return callback(err);
      }
      else{
        callback(null, result.rows[0]);
        done();
      }
    });
  });
};

function addToUser(data, callback){
  console.log('/models/cigar.js', data);
  pool.connect(function(err, client, done){
    if(err){
      done();
      return callback(err);
    }

    // client.query('INSERT INTO cigars (brand, name, origin, wrapper_color, wrapper_country, filler, body) VALUES ($1, $2, $3, $4, $5, $6, $7);',
    // [data.brand, data.name, data.origin.country, data.wrapperColor, data.wrapperCountry, data.filler, data.body],
    client.query('INSERT INTO users_cigars (user_id, cigars_id, date, quantity, '
    + 'sizes_id, gauges_id, condition, comments) VALUES ($1, $2, $3, $4, $5, $6, '
    + '$7, $8);',
    [data.user.id, data.name.id, data.date, data.quantity, data.size, data.gauge,
    data.condition, data.comments], function(err, result){
      if(err){
        done();
        return callback(err);
      }
      else{
        callback(null, result.rows[0]);
        done();
      }
    });
  });
};

function findByIdAndRemove(data, callback){
  pool.connect(function(err, client, done){
    if(err){
      done();
      return callback(err);
    }
    client.query('DELETE FROM users_cigars WHERE cigars_id = $1', [data],
    function(err, result){
      if(err){
        done();
        return callback(err);
      }
      else{
        callback(null, result.rows[0]);
        done();
      }
    });
  });
};




module.exports = {
  create: create,
  getCigarList: getCigarList,
  getArrayList: getArrayList,
  getUserCigars: getUserCigars,
  createAndAdd: createAndAdd,
  addToUser: addToUser,
  findByIdAndRemove: findByIdAndRemove
};
