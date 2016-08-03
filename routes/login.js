var router = require('express').Router();
var passport = require('passport');
var path = require('path');

router.get('/', function(request, response){
  response.send(request.isAuthenticated());
});

//post method to the server and db
router.post('/', passport.authenticate('local'), function(request, response){
  response.sendStatus(200);
});

module.exports = router;
