var router = require('express').Router();
var path = require('path');
var Cigars = require('../models/cigar');

router.get('/', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/humidor.html'));
});

router.get('/addACigar', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/addACigar.html'));
});

router.post('/addACigar', function(request, response, next){
  console.log(request.body);

  Cigars.create(request.body, function(err, post){
    if(err){
      console.log('/routes/humidor.js', err);
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
