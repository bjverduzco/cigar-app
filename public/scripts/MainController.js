angular.module('cigarApp').controller('MainController', ['$http', '$location', function($http, $location){
  var vm = this;

  vm.humidor = function() {
    $location.path('/humidor');
  };

  vm.ratings = function() {
  $location.path('/ratings');
  };

  vm.hygrometer = function() {
    $location.path('/hygrometer');
  };

  vm.addACigar = function() {
    $location.path('/humidor/addACigar');
  };

  vm.addARating = function() {
    $location.path('/ratings/addARating');
  };

  vm.addAHygrometer = function() {
    $location.path('/hygrometer/addAHygrometer');
  };

}]);
