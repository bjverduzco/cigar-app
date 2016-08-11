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

    client.query('INSERT INTO cigars (brand, name, origin, wrapper_color, wrapper_country, filler, body) VALUES ($1, $2, $3, $4, $5, $6, $7);',
    [data.brand, data.name, data.origin.country, data.wrapperColor, data.wrapperCountry, data.filler, data.body], function(err, result){
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

    client.query('SELECT * FROM cigars;', function(err, result){
      sendData = result.rows;
      console.log(sendData);
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
  })
}

module.exports = {
  create: create,
  getCigarList: getCigarList
};
