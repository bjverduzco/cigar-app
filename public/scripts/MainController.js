angular.module('cigarApp').controller('MainController', ['$http', '$location', function($http, $location){
  var vm = this;
  

  //nav bar button functions to route to correct pages
  //route to /humidor
  vm.humidor = function() {
    $location.path('/humidor');
  };

  //route to /ratings
  vm.ratings = function() {
  $location.path('/ratings');
  };

  //route to /hygrometer
  vm.hygrometer = function() {
    $location.path('/hygrometer');
  };

  //route to /humidor/addACigar
  vm.addACigar = function() {
    $location.path('/humidor/addACigar');
  };

  //route to /ratings/addARating
  vm.addARating = function() {
    $location.path('/ratings/addARating');
  };

  //route to /hygromter/addAHygrometer
  vm.addAHygrometer = function() {
    $location.path('/hygrometer/addAHygrometer');
  };

}]);
