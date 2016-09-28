var express = require('express');
var path = require('path'); //just for testing that the server is up
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var localStrategy = require('passport-local').Strategy;

//Required Routes and Models
var index = require('./routes/index');
var User = require('./models/user');
var register = require('./routes/register');
var login = require('./routes/login');
var humidor = require('./routes/humidor');
var Cigar = require('./models/cigar');
var ratings = require('./routes/ratings');
var Rating = require('./models/rating');
var hygrometer = require('./routes/hygrometer');
var Hygrometers = require('./models/hygrometer');

var app = express();

//Configs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(session({
  secret: 'secret',
  key: 'user',
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: 30 * 60 * 1000, secure: false}
}));
app.use(passport.initialize());
app.use(passport.session());




//Routes
app.use('/', index);
app.use('/login', login);
app.use('/register', register);
app.use('/humidor', humidor);
app.use('/ratings', ratings);
app.use('/hygrometer', hygrometer);

app.use('/api', function(request, response, next){
  if(request.isAuthenticated()){
    next();
  }
  else {
    response.sendStatus(403);
  }
});

app.use('/*', function(request, response, next){
  response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

// app.get('/', function(request, response){
//   response.sendFile(path.join(__dirname, './public/views/index.html'));
// });

//Passport
passport.use('local', new localStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, function(username, password, done){
  User.findAndComparePassword(username, password, function(err, isMatch, user){
    if(err){
      return done(err);
    }

    if(isMatch){
      //successful authorization of user
      return done(null, user);
    }
    else{
      done(null, false);
    }
  });
}));

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    if(err){
      return done(err);
    }
    else{
      done(null, user);
    }
  });
});

//server
app.set('port', (process.env.PORT || 3000));
var server = app.listen(app.get('port'), handleServerStart);

function handleServerStart(){
  var port = server.address().port;
  console.log('Listening to port', port);
  console.log('Press Ctrl-C to quit');
}
