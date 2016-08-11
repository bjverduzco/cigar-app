var router = require('express').Router();
var path = require('path');
var Cigars = require('../models/cigar');

router.get('/', function(request, response, next){
  var sendData = {};
  Cigars.getCigarList( function(err, result){
    if(err){
      console.log(' get for /routes/humidor.js', err);
      next(err);
    }
    else {
      console.log('success geting cigar list', result);
      sendData = result.body;
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
