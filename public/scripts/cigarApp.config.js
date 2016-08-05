angular.module('cigarApp').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider
  .when('/', {
    templateUrl: '/views/login.html',
    controller: 'LoginController',
    controllerAs: 'login'
  })
  .when('/register', {
    templateUrl: '/views/register.html',
    controller: 'RegisterController',
    controllerAs: 'register'
  })
  .when('/humidor', {
    templateUrl: '/views/humidor.html',
    controller: 'HumidorController',
    controllerAs: 'humidor',
    // resolve: {
    //   cigarData: function(CigarService){
    //     return CigarService.getCigars().then(function(response){
    //       return response.data;
    //     });
    //   },
    //   userCigarData: function(CigarService){
    //     return CigarService.getUserCigars().then(function(response){
    //       return response.data;
    //     });
    //   }
    // }
  })
  .when('/humidor/addACigar', {
    templateUrl: '/views/addACigar.html',
    controller: 'HumidorController',
    controllerAs: 'humidor'
  })
  .when('/ratings', {
    templateUrl: '/views/ratings.html',
    controller: 'RatingsController',
    controllerAs: 'ratings'
  })
  .when('/ratings/addARating', {
    templateUrl: '/views/addARating.html',
    controller: 'RatingsController',
    controllerAs: 'ratings'
  })
  .when('/hygrometer', {
    templateUrl: '/views/hygrometer.html',
    controller: 'HygrometerController',
    controllerAs: 'hygrometer'
  })
  .when('/hygrometer/addAHygrometer', {
    templateUrl: '/views/addAHygrometer.html',
    controller: 'HygrometerController',
    controllerAs: 'hygrometer'
  });

  $locationProvider.html5Mode(true);
}]);
