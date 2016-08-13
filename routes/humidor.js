var router = require('express').Router();
var path = require('path');
var Cigars = require('../models/cigar');

router.get('/', function(request, response, next){
  var sendData = {};
  Cigars.getCigarList(function(err, result){
    if(err){
      console.log(' get for /routes/humidor.js', err);
      next(err);
    }
    else {
      // console.log('success geting cigar list', result);
      sendData = result;
      // console.log('success geting cigar list /routes/humidor sendData', sendData);
      console.log('success getting cigar list, find this /humidor');
      response.send(sendData);
    }
  });
});

router.get('/arrays', function(request, response, next){
  var sendData = {};

  Cigars.getArrayList(function(err, result){
    if(err){
      console.log('err /routes/humidor/arrays', err);
      next(err);
    }
    else{
      sendData = result;
      // console.log('success getting array list', sendData);
      console.log('success getting array list, find this /arrays');
      response.send(sendData);
    }
  });
});

router.get('/addACigar', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/addACigar.html'));
});

router.post('/addACigar', function(request, response, next){
  console.log(request.body);

  Cigars.create(request.body, function(err, post){
    if(err){
      console.log(' post for /routes/humidor.js', err);
      next(err);
    }
    else{
      console.log('success adding cigar');
      response.redirect('/humidor');
    }
  });
  // response.sendStatus(200);
});

// router.get('/ratings', function(request, response){
//   response.sendFile(path.join(__dirname, '../public/views/ratings.html'));
// });

module.exports = router;
