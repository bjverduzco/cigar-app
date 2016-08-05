angular.module('cigarApp').controller('LoginController', ['$http', '$location', 'UserService',
 function($http, $location, UserService) {
  var vm = this;

  vm.user = UserService.data;

  vm.username = '';
  vm.password = '';

  vm.login = function(){
    var sendData = {};

    sendData.username = vm.username;
    sendData.password = vm.password;

    UserService.login(sendData).then(handleSuccess, handleFailure);
  };

  function handleSuccess(response){
    $location.path('/humidor');
  }

  function handleFailure(response){
    console.log('Failure Loggin in', response);
    // $location.path('/');
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
