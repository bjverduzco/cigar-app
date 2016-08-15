angular.module('cigarApp').factory('UserService', ['$http', function($http, UserService) {
  var vm = this;
  vm.userData = {};

  //function to login user and save the userData in the UserService for later use
  function login(data){
    // console.log(data);
    return $http.post('/login', data).then(function(response){
      vm.userData.user = response.data;
      console.log(vm.userData.user);
    }, function(err){
      console.log('Error in userservice', err);
      // response.sendStatus(500);
    });
  };

  function getUser(){
    return vm.userData.user;
  }

  return {
    login: login,
    getUser: getUser
  };
}]);
