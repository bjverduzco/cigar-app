angular.module('cigarApp').controller('HygrometerController', ['$http', '$location', function($http, $location){
  var vm = this;

  vm.required = true;

  vm.name = '';
  vm.minTemp = '';
  vm.maxTemp = '';
  vm.minHumidity = '';
  vm.maxHumidity = '';
  vm.location = '';
  vm.display = false;

  vm.addAHygrometer = function() {
    $location.path('/hygrometer/addAHygrometer');
  };

  vm.save = function() {
    //do some stuff
    var sendData = {};

    sendData.name = vm.name;
    sendData.minTemp = vm.minTemp;
    sendData.maxTemp = vm.maxTemp;
    sendData.minHumidity = vm.minHumidity;
    sendData.maxHumidity = vm.maxHumidity;
    if(vm.display === 'true'){
      sendData.display = true;
    }
    else{
      sendData.display = vm.display;
    }
    console.log(sendData);
    console.log('still have to do that');
  };

  vm.cancel = function() {
    $location.path('/hygrometer');
  };

}]);
