angular.module('cigarApp').factory('UserService', ['$http', function($http, UserService) {
  var userData = {};

  function login(data){
    console.log(data);
    return $http.post('/login', data).then(function(response){
      userData.user = response.data;
      console.log(userData.user);
    }, function(err){
      console.log('Error in userservice', err);
      response.sendStatus(500);
    });
  };

  return {
    login: login
  };
}]);