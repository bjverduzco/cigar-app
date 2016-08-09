angular.module('cigarApp').factory('CigarService', ['$http', function($http, CigarService) {
  var cigarData = {};
  var userCigarData = {};

  //variables to help populate fields in /addACigar and /addARating for filler,
  //wrappers(description), wrapper countries, and origin, size and gauge
  var filler = ['Brazil', 'Barbados', 'Cameroon', 'Costa Rica', 'Cuba', 'Dominican Republic',
  'Honduras', 'Indonesia', 'Italy', 'Jamaica', 'Mexico', 'Ecuador', 'Nicaragua',
  'Other', 'Panama', 'Peru', 'Philippines', 'Puerto Rico', 'Canary Islands(Spain)',
  'United States'];
  var wrapperColor = [{name: 'Candela(Double Claro)', description: 'very light,'
  + ' slightly greenish. Achieved by picking leaves before maturity and drying'
  + ' quickly, the color coming from retained green chlorophyll'},
  {name: 'Claro', description: 'very light tan or yellowish'},
  {name: 'Colorado Claro', description: 'medium brown'},
  {name: 'Colorado(Rosado)', description: 'reddish-brown'},
  {name: 'Colorado Maduro', description: 'darker brown'},
  {name: 'Maduro', description: 'very dark brown'},
  {name: 'Oscuro(Double Maduro)', description: 'black'},
  {name: 'American Market Selection(AMS)', description: 'synonymous with Candela("Double Claro")'},
  {name: 'English Market Selection(EMS)', description: 'any natural colored wrapper which is darker than Candela but lighter than Maduro'},
  {name: 'Spanish Market Selection(SMS)', description: 'one of the two darkest colors, Maduro or Oscuro'}];
  var wrapperCountries = ['Brazil', 'Cameroon', 'Connecticut Broadleaf', 'Connecticut Shade',
  'Costa Rica', 'Cuba', 'Dominican Republic', 'Ecuador', 'Honduras', 'Indonesia Besuki',
  'Indonesia Sumatra', 'Mexico', 'Nicaragua', 'Other'];
  var origin = ['Brazil', 'Barbados', 'Cameroon', 'Costa Rica', 'Cuba', 'Dominican Republic',
  'Ecuador', 'Holland', 'Honduras', 'Indonesia', 'Italy', 'Jamaica', 'Mexico',
  'Nicaragua', 'Other', 'Panama', 'Peru', 'Philippines', 'Puerto Rico', 'Canary Islands(Spain)',
   'United States'];
  var sizes = [{number: 3.4}, {number: 3.9}, {number: 4}, {number: 4.3}, {number: 4.5},
     {number: 4.8}, {number: 5}, {number: 5.5}, {number: 5.6}, {number: 5.7},
     {number: 6}, {number: 6.1}, {number: 6.2}, {number: 6.4}, {number: 6.5},
     {number: 7}, {number: 7.6}, {number: 9.2}];
  var gauges = [{number: 18}, {number: 20}, {number: 22}, {number: 24}, {number: 26},
     {number: 28}, {number: 30}, {number: 32}, {number: 34}, {number: 36}, {number: 38},
     {number: 40}, {number: 42}, {number: 44}, {number: 46}, {number: 48}, {number: 50},
     {number: 52}, {number: 54}, {number: 56}, {number: 58}, {number: 60}, {number: 62},
     {number: 64}, {number: 66}, {number: 68}, {number: 70}, {number: 72}, {number: 74},
     {number: 76}, {number: 78}];

   cigarData.filler = filler;
   cigarData.wrapperColor = wrapperColor;
   cigarData.wrapperCountry = wrapperCountry;
   cigarData.origin = origin;
   cigarData.sizes = sizes;
   cigarData.gauges = gauges;

  //function to save the cigar table from database in order to populate the
  //forms and lists
  function getCigars() {
    return $http.get('/humidor').then(function(response) {
      cigarData.cigars = response.data;
      console.log(cigarData.cigars);
    }, function(err) {
      console.log('Error getting cigarData', err);
      response.sendStatus(500);
    });
  };

  //function to save the ratings table form the db to populate ratings list
  function ratings() {
    return $http.get('/ratings').then(function(response) {
      console.log('routing to /ratings');
    }, function(respnse) {
      console.log('error routing to /ratings', response);
      response.sendStatus(500);
    });
  };

  //function to save userCigarData in order to populate the cigar list(humidor)
  function getUserCigars() {
    return;
  };

  return {
    getCigars: getCigars,
    getUserCigars: getUserCigars,
    ratings: ratings
  };

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
}]).filter('fillerFilter', ['CigarService', function(CigarService) {
    return function(fillerAll, cigarsFillers) {
      console.log(cigarsFillers.filler);
      if(cigarsFillers == '' | cigarsFillers == null){
        return fillerAll;
      }
      // console.log(fillerAll);
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
          console.log(i);
          if(filler == fillerAll[i].country){
            fillerList.push(fillerAll[i]);
          }
        }
      })
      console.log(fillerList);
      return fillerList;
    };
}]);
