angular.module('cigarApp').controller('LoginController', ['$http', '$location', function($http, $location){
  var vm = this;

  vm.username = '';
  vm.password = '';

  vm.login = function(){
    var sendData = {};

    sendData.username = vm.username;
    sendData.password = vm.password;

    $http.post('/login', sendData).then(handleSuccess, handleFailure);
  };

  function handleSuccess(response){
    console.log('Success Logging in', response);
    $location.path('/humidor');
  }

  function handleFailure(response){
    console.log('Failure Loggin in', response);
    $location.path('/');
  }

  vm.register = function(){
    $http.get('/register').then(function(response){
      console.log('Success loading registration page', response);
      $location.path('/register');
    }, function(err){
      console.log('Couldnt load registration page', err);
    });
  };

}]);
