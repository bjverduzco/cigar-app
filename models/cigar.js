var pg = require('pg');

var config = {
  database: 'solo-cigar',
  port: 5432,
  idleTimeoutMills: 30000
};

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

    // client.query('SELECT * FROM cigars;', function(err, result)
    client.query('SELECT cigars.id, brand.brand, cigars.name, body.name as body, '
    + 'wrapper_color.name as wrapper_color_name, wrapper_color.description as wrapper_color_description, '
    + 'country.country as origin_country, wrapper.country as wrapper_country '
    + 'FROM cigars '
    + 'LEFT OUTER JOIN body ON cigars.body_id = body.id '
    + 'LEFT OUTER JOIN wrapper_color ON cigars.wrapper_color_id = wrapper_color.id '
    + 'LEFT OUTER JOIN brand ON cigars.brand_id = brand.id '
    + 'LEFT OUTER JOIN origin ON cigars.origin_id = origin.id '
    + 'LEFT JOIN country ON origin.country_id = country.id '
    + 'LEFT JOIN wrapper_country ON cigars.wrapper_country_id = wrapper_country.id '
    + 'LEFT JOIN country as wrapper ON wrapper_country.country_id = wrapper.id;',
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
}

function getArrayList(callback){
  var sendData = {};
  console.log('test');

  pool.connect(function(err, client, done){
    if(err){
      done();
      return callback(err);
    }

    client.query('SELECT gauges.id as id, gauges.number as gauge_number, '
    + 'sizes.number as sizes_number, wrapper_color.name as wrapper_color_name, '
    + 'wrapper_color.description as wrapper_color_description, wrapper_country.country_id as wrapper_country_id, '
    + 'country.country as wrapper_country, c.country as all_country, filler.country_id as filler_country_id, '
    + 'c_f.country as filler_country, c_o.id as origin_country_id, c_o.country as origin_country '
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
}

module.exports = {
  create: create,
  getCigarList: getCigarList,
  getArrayList: getArrayList
};
