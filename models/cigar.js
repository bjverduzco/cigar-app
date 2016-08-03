var pg = require('pg');

var config = {
  database: 'solo-cigar',
  port: 5432,
  idleTimeoutMills: 30000
};

var pool = new pg.Pool(config);

function create(data, callback){
  console.log('/models/cigar.js', data);
  pool.connect(function(err, client, done){
    if(err);
    done();
    return callback(err);
  }

  // client.query('INSERT INTO cigars (brand, name, origin, filler, body) VALUES ($1, $2, $3, $4, $5);',
  // [data.brand, data.name, data.origin, data.filler, data.body], function(err, result){
  //   if(err){
  //     done();
  //     return callback(err);
  //   }
  //   else{
  //     callback(null, result.rows[0]);
  //     done();
  //   }
  // });
)};

module.exports = {
  create: create
};
