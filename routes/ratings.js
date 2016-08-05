var router = require('express').Router();
var path = require('path');

router.get('/', function(request, response){
  console.log('do you do anythign');
  response.sendFile(path.join(__dirname, '../public/views/ratings.html'));
});

router.get('/addARating', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/addARating.html'));
});

// router.post('/addARating', function(request, response){
//  console.log(request.body);
// });
//
// router.get('/', function(request, response){
//   response.sendFile(path.join(__dirname, '../public/views/.html'));
// });
//
// router.get('/', function(request, response){
//   response.sendFile(path.join(__dirname, '../public/views/.html'));
// });

module.exports = router;
