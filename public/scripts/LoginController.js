angular.module('cigarApp').controller('LoginController', ['$http', '$location', 'UserService',
 function($http, $location, UserService) {
  var vm = this;

  //user info being sent down from the UserService
  vm.user = UserService.data;

  //variables for login data
  vm.username = '';
  vm.password = '';

  //function to log user in, and if successful route to /humidor
  vm.login = function(){
    var sendData = {};

    sendData.username = vm.username;
    sendData.password = vm.password;

    //UserService being implemented so that the user's info can be cached
    UserService.login(sendData).then(handleSuccess, handleFailure);
  };

  function handleSuccess(response){
    $location.path('/humidor');
  }

  function handleFailure(response){
    console.log('Failure Loggin in', response);
    // $location.path('/');
  }

  //fuction to route user to /register
  vm.register = function(){
    $http.get('/register').then(function(response){
      console.log('Success loading registration page', response);
      $location.path('/register');
    }, function(err){
      console.log('Couldnt load registration page', err);
    });
  };

}]);
