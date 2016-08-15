var router = require('express').Router();
var path = require('path');
var Hygrometers = require('../models/hygrometer');

router.get('/', function(request, response, next){
  var sendData = {};
  // console.log(request.user);

  Hygrometers.getHygrometerList(function(err, result){
    if(err){
      console.log('get for /routes/hygrometer.js', err);
      next(err);
    }
    else{
      sendData = result;

      console.log('success getting hygrometer list, find this /routes/hygrometer', sendData);
      response.send(sendData);
    }
  });
});

router.get('/addAHygrometer', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/addAHygrometer'));
});

router.post('/addAHygrometer', function(request, response, next){
  var sendData = {};
  sendData = request.body;
  console.log('above here', request.user);
  sendData.user = request.user;
  console.log('here', sendData.user);

  Hygrometers.create(sendData, function(err, post){
    if(err){
      console.log('post for /routes/hygrometer.js', err);
      next(err);
    }
    else{
      console.log('success adding a hygrometer');
      response.redirect('/hygrometer');
    }
  });
});

module.exports = router;
