angular.module('cigarApp').factory('CigarService', ['$http', '$location', 'UserService', function($http, $location, UserService, CigarService) {
  var vm = this;
  vm.cigarArrays = {};
  vm.cigarData = {};
  vm.userCigarData = {};
  vm.ratings = {};
  vm.hygrometers = {};

  vm.user = UserService.getUser();
  console.log(vm.user);

  //function to save the cigar table from database in order to populate the
  //forms and lists
  function getCigars() {
    return $http.get('/humidor').then(function(response) {
      // response.send(vm.cigarData);
      vm.cigarData = response.data;
      console.log('cigarData', vm.cigarData);

    }, function(err) {
      console.log('Error getting cigarData', err);
      response.sendStatus(500);
    });
  };

//function to get and save the cigar data that will fill out the forms
  function getArrays() {
    return $http.get('/humidor/arrays').then(function(response) {
      vm.cigarArrays = response.data;
      console.log('cigarArrays', vm.cigarArrays);
    }, function(err){
      console.log('error getting arrayList', err);
      response.sendStatus(500);
    });
  };

  //function to save the ratings table form the db to populate ratings list
  function getRatings() {
    return $http.get('/ratings').then(function(response) {
      vm.ratings = response.data;
      console.log('routing to /ratings', vm.ratings);
    }, function(respnse) {
      console.log('error routing to /ratings', response);
      response.sendStatus(500);
    });
  };

  //function to save userCigarData in order to populate the cigar list(humidor)
  function getUserCigars() {
    return $http.get('/humidor/userCigars').then(function(response) {
      vm.userCigarData = response.data;
      console.log('userCigarData to /userCigars', vm.userCigarData);
    }, function(response) {
      console.log('error routing to /userCigars', response);
      response.sendStatus(500);
    });
  };

//function to get the hygrometers from the db and save them
  function getHygrometers(){
    return $http.get('/hygrometer').then(function(response) {
      vm.hygrometers = response.data;
      console.log('hygrometers, to /hygrometer', vm.hygrometers);
    }, function(response) {
      console.log('error routing to /hygrometer', response);
      response.sendStatus(500);
    });
  };

//function to save a hygrometer from the addAHygrometer page
  function hygrometerSave(sendData){
    return $http.post('/hygrometer/addAHygrometer', sendData).then(function(response){
      console.log('success adding a hygro', response);
      $location.path('/hygrometer');
    }, function(err){
      console.log('err adding a hygro', err);
      response.sendStatus(500);
    });
  };

  function cigarSave(sendData){
    return $http.post('/humidor/addACigar', sendData).then(function(response){
      console.log('success adding a cigar', response);
      $location.path('/humidor');
    }, function(err){
      console.log('err adding a cigar', err);
      response.sendStatus(500);
    });
  };

  function addToBrand(sendData){
    return $http.post('/humidor/addToBrand', sendData).then(function(response){
      console.log('success adding to a cigar', response);
      $location.path('/humidor')
      }, function(err){
        console.log('err adding first cigar to db', err);
        response.sendStatus(500);
      });

  };

  function addToCigars(sendData){
    return $http.post('/humidor/addToCigars', sendData).then(function(response){
      console.log('success adding to cigars and to users_cigars', response);
      $location.path('/humidor');
    }, function(err){
      console.log('err adding to cigars and to users_cigars', err);
      response.sendStatus(500);
    });
  };

  function addToUserCigars(sendData){
    return $http.post('/humidor/addToUserCigars', sendData).then(function(response){
      console.log('success adding to users_cigars', response);
      $location.path('/humidor');
    }, function(err){
      console.log('err adding to users_cigars', err);
      response.sendStatus(500);
    });
  };

//function to save a rating form the addARating form
  function ratingSave(sendData){
    // vm.user = UserService.getUser();
    return $http.post('/ratings/addARating', sendData).then(function(response){
      console.log('success adding a rating', response);
      $location.path('/ratings');
    }, function(err){
      console.log('err adding a rating', err);
      response.sendStatus(500);
    });
  };

  function remove(id){
    return $http.delete('/humidor/remove/:' + id).then(function(response){
      console.log(response);
      $location.path('/humidor');
    }, function(response){
      console.log(response);
    });
  };

//used to return the data being called on the controllers
  function cigarData(){
    return vm.cigarData;
  };

  function cigarArrays(){
    return vm.cigarArrays;
  };

  function userCigarData(){
    return vm.userCigarData;
  }

  function ratings(){
    return vm.ratings;
  }

  function hygrometers(){
    return vm.hygrometers;
  };


  return {
    getCigars: getCigars,
    getUserCigars: getUserCigars,
    getRatings: getRatings,
    getArrays: getArrays,
    getHygrometers: getHygrometers,
    cigarData: cigarData,
    cigarArrays: cigarArrays,
    userCigarData: userCigarData,
    cigarSave: cigarSave,
    ratingSave: ratingSave,
    hygrometerSave: hygrometerSave,
    ratings: ratings,
    hygrometers: hygrometers,
    remove: remove

  };
//filter function to check if dropdown options are unique
}]).filter('unique', ['CigarService', function(CigarService) {
    return function(input, key) {
        var unique = {};
        var uniqueList = [];
        for(var i = 0; i < input.length; i++){
            if(typeof unique[input[i][key]] == "undefined"){
                unique[input[i][key]] = "";
                uniqueList.push(input[i]);
            }
        }
        return uniqueList;
    };
    //filter function for fillers
}]).filter('fillerFilter', ['CigarService', function(CigarService) {
    return function(fillerAll, cigarsFillers) {
      // console.log('1', cigarsFillers.filler);
      if(cigarsFillers == '' | cigarsFillers == null){
        return fillerAll;
      }
      // console.log('2', fillerAll);
      // var filler = {};
      var fillerList = [];
      // for(var i = 0; i < fillerAll.length; i++){
      //   for(var j = 0; i < cigarsFillers.length; j++){
      //     if(fillerAll[i].country === cigarsFillers.filler[j]){
      //       fillerList.push(fillerAll[i]);
      //     }
      //   }
      // }
      angular.forEach(cigarsFillers.filler, function(filler){
        for(var i = 0; i < fillerAll.length; i++){
          // console.log(i);
          if(filler == fillerAll[i].country){
            fillerList.push(fillerAll[i]);
          }
        }
      })
      // console.log(fillerList);
      return fillerList;
    };
}]);
