angular.module('cigarApp').controller('HygrometerController', ['$http', '$location', function($http, $location){
  var vm = this;

  //required for all form data that must be filled out
  vm.required = true;

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
    if(vm.name === '' | vm.minTemp === '' | vm.maxTemp === '' | vm.minHumidity === '' | vm.maxHumidity === ''){
      alert('Please fill out the required fields.');
      return;
    }
    else {
      sendData.name = vm.name;
      sendData.minTemp = vm.minTemp;
      sendData.maxTemp = vm.maxTemp;
      sendData.minHumidity = vm.minHumidity;
      sendData.maxHumidity = vm.maxHumidity;
      //if display radio is switched save .display as true so that hygrometer
      //data can be displayed on the header
      if(vm.display === 'true'){
        sendData.display = true;
      }
      else{
        sendData.display = vm.display;
      }

      console.log('still have to do that');
    }


  };

  //cancels the filling out of the add a hygrometer form
  //and reroutes back to /hygrometer
  vm.cancel = function() {
    $location.path('/hygrometer');
  };

}]);
