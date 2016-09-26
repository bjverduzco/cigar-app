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

var pool = new pg.Pool(config);

function create(data, callback){
  console.log('/models/ratings.js', data);
  pool.connect(function(err, client, done){
    if(err){
      done();
      return callback(err);
    }

    client.query('INSERT INTO ratings (cigars_id, users_id, date, rating, sizes_id, '
    + 'gauges_id, taste, draw, condition, pairing, comments) VALUES '
    + '($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);',
    [data.name.id, data.user.id, data.date, data.rating, data.size.id, data.gauge.id,
    data.taste, data.draw, data.condition, data.pairing, data.comments],
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


function createAndAdd(data, callback){
  console.log('/models/ratings.js', data);
  pool.connect(function(err, client, done){
    if(err){
      done();
      return callback(err);
    }

    client.query('WITH new AS(INSERT INTO cigars(brand_id, name, body_id, '
    + 'origin_id, wrapper_color_id, wrappper_country_id,) VALUES($1, $2, '
    + '$3, $4, $5, $6) RETURNING id) INSERT INTO ratings (users_id, cigars_id, date, rating, sizes_id, '
    + 'gauges_id, taste, draw, condition, pairing, comments) VALUES '
    + '($7, (SELECT new.id from new), $9, $10, $11, $12, $13, $14, $15, $16, $17);',
    [data.brand.id, data.name.name, data.body.id, data.origin.id, data.wrapperColor.id,
      data.wrapperCountry.id, data.user.id, data.date, data.rating, data.size, data.gauge,
      data.taste, data.draw, data.condition, data.pairing, data.comments],
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

function getRatingList(callback){
  var sendData = {};

  pool.connect(function(err, client, done){
    if(err){
      done();
      return callback(err);
    }

    client.query('SELECT ratings.id, ratings.cigars_id, ratings.users_id, '
    + 'brand.brand, cigars.name, ratings.rating, sizes.number as size, gauges.number as gauge, '
    + 'ratings.date, body.name as body, '
    + 'wrapper_color.name as wrapper_color_name, wrapper_color.description as wrapper_color_description, '
    + 'country.country as origin_country, wrapper.country as wrapper_country, '
    + 'c_f.country as filler_country, ratings.taste, ratings.draw, ratings.condition, '
    + 'ratings.pairing, ratings.comments '
    + 'FROM ratings '
    + 'LEFT JOIN users ON ratings.users_id = users.id '
    + 'LEFT JOIN sizes ON ratings.sizes_id = sizes.id '
    + 'LEFT JOIN gauges ON ratings.gauges_id = gauges.id '
    + 'LEFT JOIN cigars ON ratings.cigars_id = cigars.id '
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
    + 'ORDER BY cigars.id;', function(err, result){
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

function addToBrandAndRate(data){
  pool.connect(function(err, client, done){
    if(err){
      done();
      return callback(err);
    }

    client.query('WITH newbrand AS (INSERT INTO brand (brand) VALUES ($1) RETURNING id) '
    + 'newcigar AS (INSERT INTO cigars (brand_id, name, body_id, wrapper_color_id, '
    + 'wrapper_country_id, origin_id, filler_combo_id) VALUES ((SELECT newbrand.id '
    + 'FROM newbrand), $2, $3, $4, $5, $6, $7) RETURNING id), '
    + 'INSERT INTO ratings (cigars_id, users_id, date, rating, sizes_id, gauges_id, taste '
    + 'draw, condition, pairing, comments) VALUES ((SELECT newcigar.id FROM newcigar), '
    + '$8, $9, $10, $11, $12, $13, $14, $15, $16, $17);', [data.brand, data.name,
      data.body.id, data.wrapperColor.id, data.wrapperCountry.id, data.origin.id,
      null, data.user.id, data.date, data.rating, data.size.id, data.gauge.id,
      data.taste, data.draw, data.condition, data.pairing, data.comments], function(err, result){
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

function addToCigarsAndRatings(data){
  pool.connect(function(err, client, done){
    if(err){
      done();
      return callback(err);
    }

    client.query('WITH newcigar AS (INSERT INTO cigars (brand_id, name, body_id, '
    + 'origin_id, wrapper_color_id, wrapper_country_id) VALUES ($1, $2, $3, $4, $5, '
    + '$6) RETURNING id) INSERT INTO ratings (cigars_id, users_id, date, rating, '
    + 'sizes_id, gauges_id, taste, draw, condition, pairing, comments) VALUES '
    + '((SELECT newcigar.id FROM newcigar), $7, $8, $9, $10, $11, $12, $13, $14, '
    + '$15, $16)', [data.brand.id, data.name, data.body.id, data.origin.id, data.wrapperColor.id,
      data.wrapperCountry.id, data.user.id, data.date, data.rating, data.size.id,
      data.gauge.id, data.taste, data.draw, data.condition, data.pairing, data.comments],
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

function updateAndRate(data){
  pool.connect(function(err, client, done){
    if(err){
      done();
      return callback(err);
    }

    client.query('WITH updated AS (UPDATE cigars SET body_id = $1, wrapper_color_id '
    + '= $2, wrapper_country_id = $3, origin_id = $4, filler_combo_id = $5 WHERE '
    + 'cigars.name = $6 RETURNING id) INSERT INTO ratings (cigars_id, users_id, '
    + 'date, rating, sizes_id, gauges_id, taste, draw, condition, pairing, comments) '
    + 'VALUES ((SELECT updated.id FROM updated), $7, $8, $9, $10, $11, $12, $13, '
    + '$14, $15, $16);', [data.body.id, data.wrapperColor.id, wrapperCountry.id,
      data.origin.id, null, data.name.name, data.user.id, data.date, data.rating,
      data.size.id, data.gauge.id, data.taste, data.draw, data.condition, data.pairing,
      data.comments], function(err, result){
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

function saveRatingEdit(data, callback){
  pool.connect(function(err, client, done){
    if(err){
      done();
      return callback(err);
    }

    client.query('query', [values], function(err, result){
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
  createAndAdd: createAndAdd,
  getRatingList: getRatingList,
  addToBrandAndRate: addToBrandAndRate,
  addToCigarsAndRatings: addToCigarsAndRatings,
  updateAndRate: updateAndRate,
  saveRatingEdit: saveRatingEdit
};
