angular.module('cigarApp').controller('HumidorController', ['$http', '$location', 'CigarService', function($http, $location, CigarService){
  var vm = this;

  vm.cashMoney = 'money in the bank';
  vm.brand = '';
  vm.newBrand = '';
  vm.name = '';
  vm.newName = '';
  vm.date = '';
  vm.picUpload = '';
  vm.quantity = '';
  vm.size = '';
  vm.gauge = '';
  vm.orgin = '';
  vm.filler = '';
  vm.body = '';
  vm.condition = '';
  vm.comments = '';

  vm.edit = {};
  vm.edit.brand = true;
  vm.edit.name = true;
  vm.edit.more = true;
  vm.edit.less = true;

  vm.required = {};
  vm.required.always = true;
  vm.required.brand = true;
  vm.required.secondaryBrand = false;
  vm.required.name = true;
  vm.required.secondaryName = false;


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

  vm.addACigar = function(){
    console.log('bleh go to cigar form');
    $http.get('/humidor/addACigar').then(handleSuccessAddACigar, handleFailureAddACigar);
  };

  function handleSuccessAddACigar(response){
    console.log('success navigating to addACigar', response);
    $location.path('/humidor/addACigar');
  }

  function handleFailureAddACigar(err){
    console.log('Couldnt navigate to addACigar', err);
  }

  vm.moreOptions = function(visable){
    visable.more = !visable.more;
    visable.less = !visable.less;
  };

  vm.lessOptions = function(visable){
    visable.more = !visable.more;
    visable.less = !visable.less;
  };

  vm.save = function(){
    var sendData = {};
    console.log('clicked');

    if(vm.newBrand === ''){
      sendData.brand = vm.brand;
    }
    else{
      sendData.brand = vm.newBrand;
    }

    if(vm.newName === ''){
      sendData.name = vm.name;
    }
    else{
      sendData.name = vm.newName;
    }
    sendData.date = vm.date;
    sendData.picUpload = vm.picUpload;
    sendData.quantity = vm.quantity;
    sendData.size = vm.size;
    sendData.gauge = vm.gauge;
    sendData.origin = vm.orgin;
    sendData.filler = vm.filler;
    sendData.body = vm.body;
    sendData.condition = vm.condition;
    sendData.comments = vm.comments;

    console.log(sendData);

    $http.post('/humidor/addACigar', sendData).then(function(response){
      console.log('success adding cigar', response);
      $location.path('/humidor');
    }, function(err){
      console.log('Failure adding cigar', err);
    });

  };

  vm.cancel = function(){
    $http.get('/humidor').then(function(response){
      console.log('Success canceling add a cigar and routing to /humidor', response);
      $location.path('/humidor');
    }, function(err){
      console.log('Failure to cancel and route to /humidor, trying to reroute anyways', response);
      $location.path('/humidor');
    });
  };

}]);
