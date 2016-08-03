var router = require('express').Router();
var passport = require('passport');
var path = require('path');
var Users = require('../models/user');

router.get('/', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/register.html'));
});

//posts the username and password to be registered
router.post('/', function(request, response, next){
  //creates the username and password based on the input field
  Users.create(request.body.username, request.body.password, function(err, post){
    if(err){
      console.log('error creating user', err);
      next(err);
    }
    else {
      console.log('redirecting to splash page');
      //user is registered and now needs to login
      //redirect them to the same page so that they can
      //sign in with their info
      response.redirect('/');
    }
  });
});

module.exports = router;
