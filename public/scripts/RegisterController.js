angular.module('cigarApp').controller('RegisterController', ['$http', '$location', function($http, $location){
  var vm = this;

  //input field variables
  vm.username = '';
  vm.password = '';

  //function to register the user and subsequently route to /login
  vm.register = function(){
    var sendData = {};

    sendData.username = vm.username;
    sendData.password = vm.password;
    console.log(sendData);

    //post sending user data to register
    $http.post('/register', sendData).then(handleSuccess, handleFailure);
  }

  //if user registration is successful route to /login
  function handleSuccess(response){
    console.log('Registration Success', response);
    $location.path('/');
  }

  function handleFailure(response){
    console.log('Failure Registering', response);
    $location.path('/register');
  }

}]);
