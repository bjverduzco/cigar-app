angular.module('cigarApp').controller('RatingsController', ['$http', '$location', 'CigarService', function($http, $location, CigarService){
  var vm = this;

  //cigarData from CigarService to populate data/form
  vm.cigarData = CigarService.cigarData();
  vm.cigarArrays = CigarService.cigarArrays();
  vm.rates = CigarService.ratings();
  console.log(vm.ratings);

  //arrays for sizes and gauges dropdown fields
  // vm.sizes = [{number: 3.4}, {number: 3.9}, {number: 4}, {number: 4.3}, {number: 4.5}, {number: 4.8}, {number: 5}, {number: 5.5}, {number: 5.6}, {number: 5.7}, {number: 6}, {number: 6.1}, {number: 6.2}, {number: 6.4}, {number: 6.5}, {number: 7}, {number: 7.6}, {number: 9.2}];
  // vm.gauges = [{number: 18}, {number: 20}, {number: 22}, {number: 24}, {number: 26}, {number: 28}, {number: 30}, {number: 32}, {number: 34}, {number: 36}, {number: 38}, {number: 40}, {number: 42}, {number: 44}, {number: 46}, {number: 48}, {number: 50}, {number: 52}, {number: 54}, {number: 56}, {number: 58}, {number: 60}, {number: 62}, {number: 64}, {number: 66}, {number: 68}, {number: 70}, {number: 72}, {number: 74}, {number: 76}, {number: 78}];

  //variables for form data
  vm.brand = '';
  vm.newBrand = '';
  vm.name = '';
  vm.newName = '';
  vm.date = '';
  vm.picUpload = '';
  vm.rating = '';
  vm.size = '';
  vm.gauge = '';
  vm.origin = '';
  vm.wrapperColor = '';
  vm.wrapperCountry = '';
  vm.filler = [];
  vm.body = '';
  vm.taste = '';
  vm.draw = '';
  vm.condition = '';
  vm.pairing = '';
  vm.comments = '';

  //edit variables for when to display the brand and name if option other is selected
  //and variables to show more or less options
  vm.edit = {};
  vm.edit.brand = true;
  vm.edit.name = true;
  vm.edit.more = true;
  vm.edit.less = true;

  //required variables
  //always for form fields that are always required
  //brand and name for drop down and secondaryBrand and secondaryName for when
  //the other option is chosen
  vm.required = {};
  vm.required.always = true;
  vm.required.brand = true;
  vm.required.secondaryBrand = false;
  vm.required.name = true;
  vm.required.secondaryName = false;

  //function to show and hide brand and name input fields when other option is
  //selected or deselected
  vm.change = function(){
    if(vm.brand.brand === 'other'){
      vm.edit.brand = false;
      vm.required.secondaryBrand = true;
    }
    if(vm.brand.brand !== 'other'){
      vm.edit.brand = true;
      vm.required.secondaryBrand = false;
    }

    if(vm.name !== ''){
      if(vm.name.name === 'other'){
        vm.name.origin_country = '';
        vm.name.wrapper_color_name = '';
        vm.name.wrapper_country = '';
        vm.name.body = '';
        // vm.name.filler = '';
        vm.edit.name = false;
        vm.required.secondaryName = true;
      }
      if(vm.name.name !== 'other'){
        vm.edit.name = true;
        vm.required.secondaryName = true;
        // vm.wrapperColor = vm.name.wrapperColor;
        for(var i = 0; i < vm.cigarArrays.length; i++){
          if(vm.name.origin_country == vm.cigarArrays[i].origin_country){
            vm.origin = vm.cigarArrays[i];
          }
          else if(vm.name.origin_country == '' | vm.name.origin_country == null){
            vm.origin = '';
          }
        }
        for(var i = 0; i < vm.cigarArrays.length; i++){
          if(vm.name.wrapper_color_name == vm.cigarArrays[i].wrapper_color_name){
            vm.wrapperColor = vm.cigarArrays[i];
          }
          else if(vm.name.wrapper_color_name == '' | vm.name.wrapper_color_name == null){
            vm.wrapperColor = '';
          }
        }
        for(var i = 0; i < vm.cigarArrays.length; i++){
          if(vm.name.wrapper_country == vm.cigarArrays[i].wrapper_country){
            vm.wrapperCountry = vm.cigarArrays[i];
          }
          else if(vm.name.wrapper_country == '' | vm.name.wrapper_country == null){
            vm.wrapperCountry = '';
          }
        }
        for(var i = 0; i < vm.cigarArrays.length; i++){
          if(vm.name.body == vm.cigarArrays[i].body){
            vm.body = vm.cigarArrays[i];
          }
          else if(vm.name.body == '' | vm.name.body == null){
            vm.body = '';
          }
        }
        vm.filler = [];
        //totally doesnt work!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // for(var i = 0; i < vm.name.filler_country.length; i++){
        //   if(vm.name.filler !== '' | vm.name.filler !== null){
        //     for(var j = 0; j < vm.cigarArrays.length; j++){
        //       if(vm.name.filler_country[i] == vm.cigarArrays[j].filler_country){
        //         vm.filler.push(vm.cigarArrays[j]);
        //         console.log(vm.filler);
        //       }
        //     }
        //   }
        //   else {
        //     vm.filler = '';
        //   }
        // }
      }
    }
  };
  //route to /ratings/addARating form form ratings list
  vm.addARating = function(){
    $location.path('/ratings/addARating');
  };

  //functions to show more or less options
  vm.moreOptions = function(visable){
    visable.more = !visable.more;
    visable.less = !visable.less;
  };

  vm.lessOptions = function(visable){
    visable.more = !visable.more;
    visable.less = !visable.less;
  };

  //save function to save rating form data and then send to CigarService
  //then sent to the /routes/humidor.js if cigar data needs to be added to the db
  //or if cigar is already in db then sent to /routes/ratings.js
  //then pulling down the new info and routing to /ratings
  vm.save = function(){
    var sendData = {};
    console.log('clicked');
    if(vm.date instanceof Date !== true | vm.rating < 1 | vm.rating === ''){
      return alert('Please fill out all of the required fields.');
    }

    //if brand dropdown option other is chosen, newBrand becomes a required field
    //making newBrand the data that needs to be added to the db
    // had the first if as an or with | vm.newBrand === '' | but i think this is
    //the proper way for validation that i want
    if(vm.brand !== 'other'){
      sendData.brand = vm.brand;
    }
    else if(vm.brand === 'other' || vm.newBrand === '' || vm.brand === null || vm.brand == undefined){
      return alert('Please fill out all of the required fields.');
    }
    else{
      sendData.brand = vm.newBrand;
    }

    //if name dropdown option other is chosen, newName becomes a required field
    //making newName the data that needs to be added to the db
    // had the first if as an or with | vm.newName === '' | but i think this is
    // the proper way for validation that i want
    if(vm.name !== 'other'){
      sendData.name = vm.name;
    }
    else if(vm.name === 'other' || vm.newName === '' || vm.name == null || vm.name == undefined){
      return alert('Please fill out all of the required fields.')
    }
    else{
      sendData.name = vm.newName;
    }

    //saving the rest of the form data into the sendData obj to be passed
    sendData.date = vm.date;
    // sendData.picUpload = vm.picUpload;
    sendData.rating = vm.rating;
    sendData.date = vm.date;
    if(vm.size == '' | vm.size == null | vm.size == undefined){
      sendData.size = {id: null};
    }
    else{
      sendData.size = vm.size;
    }

    if(vm.gauge == '' | vm.gauge == null | vm.gauge == undefined){
      sendData.gauge = {id: null};
    }
    else{
      sendData.gauge = vm.gauge;
    }

    if(vm.origin == '' | vm.origin == null | vm.origin == undefined){
      sendData.origin = {id: null};
    }
    else{
      sendData.origin = vm.origin;
    }

    if(vm.wrapperColor == '' | vm.wrapperColor == null | vm.wrapperColor == undefined){
      sendData.wrapperColor = {id: null};
    }
    else{
      sendData.wrapperColor = vm.wrapperColor;
    }

    if(vm.wrapperCountry == '' | vm.wrapperCountry == null | vm.wrapperCountry == undefined){
      sendData.wrapperCountry = {id: null};
    }
    else{
      sendData.wrapperCountry = vm.wrapperCountry;
    }

    if(vm.filler == '' | vm.filler == null | vm.filler == undefined){
      sendData.filler = {id: null};
    }
    else{
      sendData.filler = vm.filler;
    }

    if(vm.body == '' | vm.body == null | vm.body == undefined){
      sendData.body = {id: null};
    }
    else{
      sendData.body = vm.body;
    }
    sendData.taste = vm.taste;
    sendData.draw = vm.draw;
    sendData.condition = vm.condition;
    sendData.pairing = vm.pairing;
    sendData.comments = vm.comments;

    console.log(sendData);

    //case 1 add cigar to db and brand + name = 'other' to db, then add to
    //ratings
    if(vm.brand.brand == 'other'){
      console.log('ratcontrl addToBrandAndRate');
      CigarService.addToBrandAndRate(sendData).then(handleSuccess, handleFailure);
    }
    //case 2 add name to cigars and then add to ratings
    else if(vm.name.name == 'other'){
      console.log('ratcontrl addToCigarsAndRatings');
      CigarService.addToCigarsAndRatings(sendData).then(handleSuccess, handleFailure);
    }
    //case 3 add to ratings
    else if(sendData.name.origin_country == sendData.origin.origin_country &&
    sendData.name.wrapper_color == sendData.wrappercolor.wrapper_color_name &&
    sendData.name.wrapper_country == sendData.wrapperCountry.wrapper_country &&
    sendData.name.body == senddata.body.body){
      console.log('ratcontrl addToRatings');
      CigarService.ratingSave(sendData).then(handleSuccess, handleFailure);
    }
    //case 4 update cigars in db and add to ratings
    else{
      console.log('ratcontrl updateAndRate');
      CigarService.updateAndRate(sendData).then(handleSuccess, handleFailure);
    }
    // CigarService.ratingSave(sendData).then(handleSuccess, handleFailure);
    //posting the data to the db and routing if successful to /ratings
    // $http.post('/ratings/addARating', sendData).then(function(response){
    //   console.log('success adding rating', response);
    //   $location.path('/ratings');
    // }, function(err){
    //   console.log('Failure adding rating', err);
    // });

  };

  function handleSuccess(response){
    console.log('success navigating to addARating', response);
    $location.path('/ratings');
  }

  function handleFailure(err){
    console.log('Couldnt navigate to ratings', err);
  }

  //function for /addARating to be able to cancel and route to /ratings
  vm.cancel = function(){
    $location.path('/ratings');
  };

  //shows the values that can be edited
  vm.editCigars = function(){
    vm.edit.more = !vm.edit.more;
    vm.edit.less = !vm.edit.less;
  };

  vm.remove = function(){
    console.log('totally removed');
  };

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
