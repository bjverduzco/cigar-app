angular.module('cigarApp').factory('CigarService', ['$http', function($http) {
  var cigarData = {};
  var userCigarData = {};

  function getCigars(){
    return $http.get('/humidor').then(function(response) {
      cigarData.cigars = response.data;
      console.log(cigarData.cigars);
    }, function(err) {
      console.log('Error getting cigarData', err);
      response.sendStatus(500);
    });
  };

  function getUserCigars(){
    return;
  }

  return {
    getCigars: getCigars,
    getUserCigars: getUserCigars
  };

}]);
