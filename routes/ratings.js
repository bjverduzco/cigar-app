var router = require('express').Router();
var path = require('path');
var Rating = require('../models/rating');

router.get('/', function(request, response){
  var sendData = {};

  Rating.getRatingList(function(err, result){
    if(err){
      console.log('get for /routes/ratings.js', err);
    }
    else{
      sendData = result;
      console.log('success getting ratings list, find this /routes/ratings', sendData);
      console.log('success getting ratings list, find this /routes/ratings');
      response.send(sendData);
    }
  });
  // console.log('do you do anythign');
  // response.sendFile(path.join(__dirname, '../public/views/ratings.html'));
});

router.get('/addARating', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/addARating.html'));
});

router.post('/addARating', function(request, response, next){
  // console.log(request.body);
  var sendData = {};
  sendData = request.body;
  sendData.user = request.user;

  Rating.create(sendData, function(err, post){
    if(err){
      console.log('post for /routes/ratings/addToRatings', err);
      next(err);
    }
    else{
      console.log('success adding cigar and rating');
      response.redirect('/ratings');
    }
  });
});

router.post('/addToBrandAndRate', function(request, response, next){
  var sendData = {};
  sendData = request.body;
  sendData.user = request.user;

  Rating.addToBrandAndRate(sendData, function(err, post){
    if(err){
      console.log('post for routes/ratings/addToBrandAndRate', err);
      next(err);
    }
    else{
      console.log('success adding to brand and rating cigar');
      response.redirect('/ratings');
    }
  });
});

router.post('/addToCigarsAndRatings', function(request, response, next){
  var sendData = {};
  sendData = request.body;
  sendData.user = request.user;

  Rating.addToCigarsAndRatings(sendData, function(err, post){
    if(err){
      console.log('fail post for routes/ratings/addToCigarsAndRatings', err);
      next(err);
    }
    else{
      console.log('success adding to cigars and rating cigar');
      response.redirect('/ratings');
    }
  });
});

router.post('/updateAndRate', function(request, response, next){
  var sendData = {};
  sendData = request.body;
  sendData.user = request.user;

  Rating.saveRatingEdit(sendData, function(err, post){
    if(err){
      console.log('fail post to routes/ratings/updateAndRate', err);
      next(err);
    }
    else{
      console.log('success updating cigar and rating');
      response.redirect('/ratings');
    }
  });
});

router.put('/saveRatingEdit', function(request, response, next){
  var sendData = {};
  sendData = request.body;
  sendData.user = request.user;
  console.log('send data', sendData);

  Rating.saveRatingEdit(sendData, function(err, put){
    if(err){
      console.log('failure put routes/ratings/saveRatingEdit', err);
      next(err);
    }
    else{
      console.log('success updating ratings');
      response.sendStatus(200);
    };
  });
});


module.exports = router;
