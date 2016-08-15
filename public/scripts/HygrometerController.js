angular.module('cigarApp').controller('HygrometerController', ['$http', '$location', 'CigarService', function($http, $location, CigarService){
  var vm = this;

  //hygrometers
  vm.hygrometers = CigarService.hygrometers();

  //required for all form data that must be filled out
  vm.required = true;

  //edit variables for when to display the brand and name if option other is selected
  //and variables to show more or less options
  vm.edit = {};
  vm.edit.more = true;
  vm.edit.less = true;

  //variables that are in the form
  vm.name = '';
  vm.minTemp = '';
  vm.maxTemp = '';
  vm.minHumidity = '';
  vm.maxHumidity = '';
  vm.location = '';
  vm.display = false;

  //routes from /hygrometer to the /addAHygrometer page
  vm.addAHygrometer = function() {
    $location.path('/hygrometer/addAHygrometer');
  };

  //save function for adding a hygrometer
  vm.save = function() {
    //do some stuff
    var sendData = {};

    //if any of the required fields are empty alert the user, and exit the function
    //else if everthing is filled out send hygrometer info to HygrometerService and then
    //to /routes/hygrometer.js to add to the database
    //then route to /hygrometer with the new data
    if(vm.name == '' | vm.name == null | vm.minTemp == '' | vm.minTemp == null |
    vm.maxTemp =='' | vm.minHumidity == '' | vm.minHumidity == null | vm.maxHumidity == '' |
    vm.location == '' | vm.location == null){
      return alert('Please fill out all of the fields.');
    }
    else if(vm.minTemp > vm.maxTemp){
      return alert('The minimum temperature cannot be greater than the maximum temperature.');
    }
    else if(vm.minHumidity > vm.maxHumidity){
      return alert('The minimum humidity cannot be greater than the maximum humidity');
    }
    else {
      sendData.name = vm.name;
      sendData.minTemp = vm.minTemp;
      sendData.maxTemp = vm.maxTemp;
      sendData.minHumidity = vm.minHumidity;
      sendData.maxHumidity = vm.maxHumidity;
      sendData.location = vm.location;
      //if display radio is switched save .display as true so that hygrometer
      //data can be displayed on the header
      if(vm.display === 'true'){
        sendData.display = true;
      }
      else{
        sendData.display = vm.display;
      }

      console.log('add a hyg sendData', sendData);
      CigarService.hygrometerSave(sendData).then(handleSuccess, handleFailure);
    }

  };

  function handleSuccess(response){
    console.log('great success', response);
    $location.path('/humidor');
  };

  function handleFailure(response){
    console.log('miserable failure', response);
  };

  //cancels the filling out of the add a hygrometer form
  //and reroutes back to /hygrometer
  vm.cancel = function() {
    $location.path('/hygrometer');
  };

  vm.editHygrometers = function(){
    vm.edit.more = !vm.edit.more;
    vm.edit.less = !vm.edit.less;
  }
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
