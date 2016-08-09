angular.module('cigarApp').controller('RatingsController', ['$http', '$location', function($http, $location){
  var vm = this;

  //arrays for sizes and gauges dropdown fields
  vm.sizes = [{number: 3.4}, {number: 3.9}, {number: 4}, {number: 4.3}, {number: 4.5}, {number: 4.8}, {number: 5}, {number: 5.5}, {number: 5.6}, {number: 5.7}, {number: 6}, {number: 6.1}, {number: 6.2}, {number: 6.4}, {number: 6.5}, {number: 7}, {number: 7.6}, {number: 9.2}];
  vm.gauges = [{number: 18}, {number: 20}, {number: 22}, {number: 24}, {number: 26}, {number: 28}, {number: 30}, {number: 32}, {number: 34}, {number: 36}, {number: 38}, {number: 40}, {number: 42}, {number: 44}, {number: 46}, {number: 48}, {number: 50}, {number: 52}, {number: 54}, {number: 56}, {number: 58}, {number: 60}, {number: 62}, {number: 64}, {number: 66}, {number: 68}, {number: 70}, {number: 72}, {number: 74}, {number: 76}, {number: 78}];

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
  vm.orgin = '';
  vm.wrapper = '';
  vm.filler = '';
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
    if(vm.brand === 'other'){
      vm.edit.brand = false;
      vm.required.secondaryBrand = true;
    }
    if(vm.name === 'other'){
      vm.edit.name = false;
      vm.required.secondaryName = true;
    }
    if(vm.brand !== 'other'){
      vm.edit.brand = true;
      vm.required.secondaryBrand = false;
    }
    if(vm.name !== 'other'){
      vm.edit.name = true;
      vm.required.secondaryName = true;
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

    //if brand dropdown option other is chosen, newBrand becomes required field
    //making newBrand the data that needs to be added to the db
    if(vm.newBrand === ''){
      sendData.brand = vm.brand;
    }
    else{
      sendData.brand = vm.newBrand;
    }

    //if name dropdown option other is chosen, newName becomes a required field
    //making newName the datat that needs to be added to the db
    if(vm.newName === ''){
      sendData.name = vm.name;
    }
    else{
      sendData.name = vm.newName;
    }

    //saving the rest of the form data into the sendData obj to be passed
    sendData.date = vm.date;
    sendData.picUpload = vm.picUpload;
    sendData.rating = vm.rating;
    sendData.size = vm.size;
    sendData.gauge = vm.gauge;
    sendData.origin = vm.orgin;
    sendData.filler = vm.filler;
    sendData.body = vm.body;
    sendData.condition = vm.condition;
    sendData.comments = vm.comments;

    console.log(sendData);

    //posting the data to the db and routing if successful to /ratings
    $http.post('/ratings/addARating', sendData).then(function(response){
      console.log('success adding rating', response);
      $location.path('/ratings');
    }, function(err){
      console.log('Failure adding rating', err);
    });

  };

  //function for /addARating to be able to cancel and route to /ratings
  vm.cancel = function(){
    $location.path('/ratings');
  };
}]);
