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
  console.log('/models/hygrometer.js', data);

  pool.connect(function(err, client, done){
    if(err){
      done();
      return callback(err);
    }

    client.query('INSERT INTO hygrometer (users_id, name, temperature_min, '
    + 'temperature_max, humidity_min, humidity_max, location, display) VALUES '
    + '($1, $2, $3, $4, $5, $6, $7, $8)', [data.user.id, data.name, data.minTemp, data.maxTemp,
    data.minHumidity, data.maxHumidity, data.location, data.display],
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

function getHygrometerList(callback){
  var sendData = {};

  pool.connect(function(err, client, done){
    if(err){
      done();
      return callback(err);
    }

    client.query('SELECT hygrometer.id, users.id as users_id, users.username, '
    + 'hygrometer.name, hygrometer.temperature_min, hygrometer.temperature_max, '
    + 'hygrometer.humidity_min, hygrometer.humidity_max, hygrometer.location, '
    + 'hygrometer.display '
    + 'FROM hygrometer '
    + 'LEFT JOIN users ON hygrometer.users_id = users.id;', function(err, result){
      sendData = result.rows;
      // console.log('/models/hygrometer', sendData);
      console.log('/models/hygrometer');
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

module.exports = {
  create: create,
  getHygrometerList: getHygrometerList
};
