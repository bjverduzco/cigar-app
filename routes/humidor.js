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
      console.log('success getting cigar list, find this /routes/humidor');
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

router.get('/userCigars', function(request, response, next){
  var sendData = {};
  var user = {};
  user = request.user;
  console.log(user);

  Cigars.getUserCigars(user, function(err, result){
    if(err){
      console.log('err /routes/humidor/userCigars', err);
    }
    else{
      sendData = result;
      console.log('success getting userCigars, find this /userCigars');
      response.send(sendData);
    }
  });
});

router.get('/addACigar', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/addACigar.html'));
});

router.post('/addACigar', function(request, response, next){
  var sendData = {};
  sendData = request.body;
  sendData.user = request.user;
  console.log(sendData.user);

  Cigars.create(sendData, function(err, post){
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

router.post('/addToCigars', function(request, response, next){
  var sendData = {};
  sendData = request.body;
  sendData.user = request.user;

  Cigars.createAndAdd(sendData, function(err, post){
    if(err){
      console.log('post /routes/humidor/addToCigars', err);
      next(err);
    }
    else{
      console.log('success adding to cigars and users_cigars');
      response.redirect('/humidor');
    }
  });
});

router.post('/addToUserCigars', function(request, response, next){
  var sendData = {};
  sendData = request.body;
  sendData.user = request.user;

  Cigars.addToUser(sendData, function(err, post){
    if(err){
      console.log('post /routes/humidor/addToUserCigars', err);
      next(err);
    }
    else{
      console.log('success adding to users_cigars');
      response.redirect('/humidor');
    }
  });
});

router.post('/addToBrand', function(request, response, next){
  var sendData = {};
  sendData = request.body;
  sendData.user = request.user;

  Cigars.addToBrand(sendData, function(err, post){
    if(err){
      console.log('post /routes/humidor/addToBrand', err);
      next(err);
    }
    else{
      console.log('success adding to brand, cigars and users_cigars');
      response.redirect('/humidor')
    }
  });
});

router.post('/updateAndAdd', function(request, response, next){
  var sendData = {};
  sendData = request.body;
  sendData.user = request.user;

  Cigars.updateAndAdd(sendData, function(err, put){
    if(err){
      console.log('put /routes/humidor/updateAndAdd', err);
    }
    else{
      console.log('success updating cigars and adding to users_cigars');
      response.redirect('/humidor');
    }
  });
});

router.delete('/remove/:id', function(request, response){
  var id = request.params.id;
  console.log(id);
  Cigars.findByIdAndRemove(id, function(err){
    if(err){
      console.log(err);
      response.sendStatus(500);
    }
    else{
      console.log('cigar deleted.');
      response.sendStatus(200);
    }
  });
});

router.put('/saveCigarEdit', function(request, response, next){
  var sendData = {};
  sendData = request.body;
  sendData.user = request.user;
  // console.log('test', sendData);
  //
  Cigars.saveEdit(sendData, function(err, put){
    if(err){
      console.log('err updating users_cigars', err);
      next(err);
    }
    else{
      console.log('cigar updated');
      response.sendStatus(200);
    }
  });
});

// router.get('/ratings', function(request, response){
//   response.sendFile(path.join(__dirname, '../public/views/ratings.html'));
// });

module.exports = router;
