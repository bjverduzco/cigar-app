angular.module('cigarApp').factory('CigarService', ['$http', function($http) {
  var cigarData = {};
  var userCigarData = {};

  function getCigars() {
    return $http.get('/humidor').then(function(response) {
      cigarData.cigars = response.data;
      console.log(cigarData.cigars);
    }, function(err) {
      console.log('Error getting cigarData', err);
      response.sendStatus(500);
    });
  };

  function ratings() {
    return $http.get('/ratings').then(function(response) {
      console.log('routing to /ratings');
    }, function(respnse) {
      console.log('error routing to /ratings', response);
      response.sendStatus(500);
    });
  };

  function getUserCigars() {
    return;
  }

  return {
    getCigars: getCigars,
    getUserCigars: getUserCigars,
    ratings: ratings
  };

}]);
