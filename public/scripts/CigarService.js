angular.module('cigarApp').factory('CigarService', ['$http', '$location', function($http, $location, CigarService) {
  var vm = this;
  vm.cigarData = {};
  vm.userCigarData = {};

  //variables to help populate fields in /addACigar and /addARating for filler,
  //wrappers(description), wrapper countries, and origin, size and gauge
  // vm.cigarData = [{brand:'5 Vegas'},
  // {brand:'A.J. Fernandez'},
  // {brand:'AVO', name: 'Bleh', origin: 'Dominican Republic', wrapperColor: 'Maduro', wrapperCountry: 'Indonesia Sumatra', body: 'Mild', filler: ['Costa Rica', 'Cameroon']},
  // {brand:'AVO', name: 'test', origin: 'Cuba', wrapperColor: 'Claro', wrapperCountry: 'Indonesia Sumatra', body: 'Mild', filler: ['Cuba', 'Jamaica']},
  // {brand:'AVO', name: '1234', origin: '', wrapperColor: '', wrapperCountry: 'Mexico', body: 'Mild-medium', filler: ['Costa Rica', 'Cameroon']},
  // {brand:'AVO', name: 'jfjfjjfjf', origin: '', wrapperColor: '', wrapperCountry: '', body: 'Full', filler: ['Philippines', 'Nicaragua']},
  // {brand:'AVO', name: 'fds', origin: '', wrapperColor: 'Maduro', wrapperCountry: 'Brazil', body: '', filler: ['Dominican Republic', 'Mexico']},
  // {brand:'AVO', name: 'whynot', filler: []},
  // {brand:'Acid', name: 'test'},
  // {brand:'Aging Room', name: 'other'},
  // {brand:'Alec Bradley'},
  // {brand:'El Aroma'},
  // {brand:'El Aroma de Cuba'},
  // {brand: 'other', name: 'other'},
  // {brand:'Tatiana'},
  // {brand:'Tatuaje', name: 'idk'},
  // {brand: 'Te Amo'},
  // {brand: 'Torano', name: 'Exodus 1958'},
  // {brand: 'Vegafina'}];
  //arrays for sizes and gauges
  vm.cigarData.sizes = [{number: 3.4}, {number: 3.9}, {number: 4}, {number: 4.3},
    {number: 4.5}, {number: 4.8}, {number: 5}, {number: 5.5}, {number: 5.6},
    {number: 5.7}, {number: 6}, {number: 6.1}, {number: 6.2}, {number: 6.4},
    {number: 6.5}, {number: 7}, {number: 7.6}, {number: 9.2}];
  vm.cigarData.gauges = [{number: 18}, {number: 20}, {number: 22}, {number: 24},
    {number: 26}, {number: 28}, {number: 30}, {number: 32}, {number: 34}, {number: 36},
    {number: 38}, {number: 40}, {number: 42}, {number: 44}, {number: 46}, {number: 48},
    {number: 50}, {number: 52}, {number: 54}, {number: 56}, {number: 58}, {number: 60},
    {number: 62}, {number: 64}, {number: 66}, {number: 68}, {number: 70}, {number: 72},
    {number: 74}, {number: 76}, {number: 78}];
  //brand name origin filler body wrapper
  vm.cigarData.fillerAll = [{country: 'Brazil'}, {country: 'Barbados'}, {country: 'Cameroon'},
  {country: 'Costa Rica'}, {country: 'Cuba'}, {country: 'Dominican Republic'},
  {country: 'Honduras'}, {country: 'Indonesia'}, {country: 'Italy'}, {country: 'Jamaica'},
  {country: 'Mexico'}, {country: 'Ecuador'}, {country: 'Nicaragua'}, {country: 'Other'},
  {country: 'Panama'}, {country: 'Peru'}, {country: 'Philippines'}, {country: 'Puerto Rico'},
  {country: 'Canary Islands(Spain)'}, {country: 'United States'}];
  vm.cigarData.wrapperColor = [{name: 'Candela(Double Claro)', description: 'very light,'
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
  vm.cigarData.wrapperCountry = [{country: 'Brazil'}, {country: 'Cameroon'}, {country: 'Connecticut Broadleaf'},
  {country: 'Connecticut Shade'}, {country: 'Costa Rica'}, {country: 'Cuba'},
  {country: 'Dominican Republic'}, {country: 'Ecuador'}, {country: 'Honduras'},
  {country: 'Indonesia Besuki'}, {country: 'Indonesia Sumatra'}, {country: 'Mexico'},
  {country: 'Nicaragua'}, {country: 'Other'}];
  vm.cigarData.originAll = [{country: 'Brazil'}, {country: 'Barbados'}, {country: 'Cameroon'},
  {country: 'Costa Rica'}, {country: 'Cuba'}, {country: 'Dominican Republic'},
  {country: 'Ecuador'}, {country: 'Holland'}, {country: 'Honduras'}, {country: 'Indonesia'},
  {country: 'Italy'}, {country: 'Jamaica'}, {country: 'Mexico'}, {country: 'Nicaragua'},
  {country: 'Other'}, {country: 'Panama'}, {country: 'Peru'}, {country: 'Philippines'},
  {country: 'Puerto Rico'}, {country: 'Canary Islands(Spain)'}, {country: 'United States'}];
  vm.cigarData.body = [{name: 'Mild'}, {name: 'Mild-medium'}, {name: 'Medium'}, {name: 'Medium-full'}, {name: 'Full'}];


  //  cigarData.filler = filler;
  //  cigarData.wrapperColor = wrapperColor;
  //  cigarData.wrapperCountry = wrapperCountry;
  //  cigarData.origin = origin;
  //  cigarData.sizes = sizes;
  //  cigarData.gauges = gauges;

  //function to save the cigar table from database in order to populate the
  //forms and lists
  function getCigars() {
    return $http.get('/humidor').then(function(response) {
      // response.send(vm.cigarData);
      console.log(vm.cigarData);

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

  function cigarSave(sendData){
    return $http.post('/humidor/addACigar', sendData).then(function(response){
      console.log('success adding a cigar', response);
      $location.path('/humidor');
    }, function(err){
      console.log('err adding a cigar', err);
      response.sendStatus(500);
    });
  };


  return {
    getCigars: getCigars,
    getUserCigars: getUserCigars,
    ratings: ratings,
    cigarData: vm.cigarData,
    cigarSave: cigarSave
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
