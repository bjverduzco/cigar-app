angular.module('cigarApp').controller('HumidorController', ['$http', '$location', 'CigarService', function($http, $location, CigarService){
//options for using datatables and angular-datatables
 // 'DTOptionsBuilder', 'DTColumnDefBuilder', , DTOptionsBuilder, DTColumnDefBuilder

  var vm = this;

  //cigarData from CigarService to populate data/form
  vm.cigarData = CigarService.cigarData();
  vm.cigarArrays = CigarService.cigarArrays();
  vm.userCigarData = CigarService.userCigarData();
  // console.log(vm.userCigarData);

  //variables for form data
  //and cash money bc why not?
  vm.cashMoney = 'money in the bank';
  vm.brand = '';
  vm.newBrand = '';
  vm.name = '';
  vm.newName = '';
  vm.date = '';
  vm.picUpload = '';
  vm.quantity = '';
  vm.size = '';
  // vm.potentialSize = '';
  vm.gauge = '';
  // vm.potentialGauge = '';
  vm.orgin = '';
  vm.wrapperColor = '';
  vm.wrapperCountry = '';
  vm.filler = [];
  vm.body = '';
  vm.condition = '';
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
  //brand and name for drop down and secondaryBrand and secondaryName for when the
  //other option is chosen
  vm.required = {};
  vm.required.always = true;
  vm.required.brand = true;
  vm.required.secondaryBrand = false;
  vm.required.name = true;
  vm.required.secondaryName = false;


  //for options and column defs for datatables
  // vm.dtOptions = DTOptionsBuilder.newOptions();
  // vm.dtColumDefs = [
  //   DTColumnDefBuilder.newColumnDef(0),
  //   DTColumnDefBuilder.newColumnDef(1),
  //   DTColumnDefBuilder.newColumnDef(2),
  //   DTColumnDefBuilder.newColumnDef(3),
  //   DTColumnDefBuilder.newColumnDef(4),
  //   DTColumnDefBuilder.newColumnDef(5),
  //   DTColumnDefBuilder.newColumnDef(6),
  //   DTColumnDefBuilder.newColumnDef(7),
  //   DTColumnDefBuilder.newColumnDef(8),
  //   DTColumnDefBuilder.newColumnDef(9),
  //   DTColumnDefBuilder.newColumnDef(10),
  //   DTColumnDefBuilder.newColumnDef(11),
  //   DTColumnDefBuilder.newColumnDef(12).notSortable(),
  //   DTColumnDefBuilder.newColumnDef(13).notSortable()
  // ]



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
      // vm.name = '';
      // vm.name.name = 'other';
      // console.log('test name and brand switch', vm.name);
    }
    console.log('what is name???', vm.name);
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
        // vm.wrapperColor = vm.name.wrapper_color;
        console.log('to see what brand and name other gives', vm.name);
        prefill();
      }
    }
  };

//used to help prefill the options if they are known
  function prefill(){
    for(var i = 0; i < vm.cigarArrays.length; i++){
      if(vm.name.origin_country == vm.cigarArrays[i].origin_country){
        vm.origin = vm.cigarArrays[i];
      }
      else if(vm.name.origin_country == '' | vm.name.origin_country == null | vm.name.origin_country == undefined){
        vm.origin = '';
      }
    }
    for(var i = 0; i < vm.cigarArrays.length; i++){
      if(vm.name.wrapper_color_name == vm.cigarArrays[i].wrapper_color_name){
        vm.wrapperColor = vm.cigarArrays[i];
      }
      else if(vm.name.wrapper_color_name == '' | vm.name.wrapper_color_name == null | vm.name.wrapper_color_name == undefined){
        vm.wrapperColor = '';
      }
    }
    for(var i = 0; i < vm.cigarArrays.length; i++){
      if(vm.name.wrapper_country == vm.cigarArrays[i].wrapper_country){
        vm.wrapperCountry = vm.cigarArrays[i];
      }
      else if(vm.name.wrapper_country == '' | vm.name.wrapper_country == null | vm.name.wrapper_country == undefined){
        vm.wrapperCountry = '';
      }
    }
    for(var i = 0; i < vm.cigarArrays.length; i++){
      if(vm.name.body == vm.cigarArrays[i].body){
        vm.body = vm.cigarArrays[i];
      }
      else if(vm.name.body == '' | vm.name.body == null | vm.name.body == undefined){
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
  };

  //route to get /addACigar form from cigar list
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

  //functions to show more or less options on the form
  vm.moreOptions = function(visable){
    visable.more = !visable.more;
    visable.less = !visable.less;
  };

  vm.lessOptions = function(visable){
    visable.more = !visable.more;
    visable.less = !visable.less;
  };

  //save function to save cigar form data and then send that to CigarService
  //then sent to the routes/humidor.js to be saved to the db if a new cigar
  //and added to the userCigarData
  //then pulling down the new info and routing to /humidor
  vm.save = function(){
    var sendData = {};
    console.log('clicked');
    if(vm.date instanceof Date !== true | vm.quantity < 1 | vm.quantity === ''){
      return alert('Please fill out all of the required fields.');
    }

    //if brand dropdown option other is chosen, newBrand becomes a required field
    //making newBrand the data that needs to be added to the db
    // had the first if as an or with | vm.newBrand === '' | but i think this is
    //the proper way for validation that i want
    if(vm.brand.brand !== 'other'){
      console.log('do you work?');
      sendData.brand = vm.brand;
    }
    else if(vm.brand === 'other' || vm.newBrand === '' || vm.brand === null || vm.brand == undefined){
      console.log('no seriously do you?');
      return alert('Please fill out all of the required fields.');
    }
    else{
      console.log('testing fdklasfjkla;s');
      sendData.brand = vm.newBrand;
    }

    //if name dropdown option other is chosen, newName becomes a required field
    //making newName the data that needs to be added to the db
    // had the first if as an or with | vm.newName === '' | but i think this is
    // the proper way for validation that i want
    if(vm.name.name !== 'other'){
      sendData.name = vm.name;
    }
    else if(vm.name === 'other' || vm.newName === '' || vm.name == null || vm.name == undefined){
      return alert('Please fill out all of the required fields.')
    }
    else{
      sendData.name = vm.newName;
    }

    //saving the form data into sendData obj to be passed
    sendData.date = vm.date;
    // sendData.picUpload = vm.picUpload;
    sendData.quantity = vm.quantity;
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
    sendData.condition = vm.condition;
    sendData.comments = vm.comments;

    console.log('send data', sendData);

    //posting the info to the db and routing if successful to /humidor
    // $http.post('/humidor/addACigar', sendData).then(function(response){
    //   console.log('success adding cigar', response);
    //   $location.path('/humidor');
    // }, function(err){
    //   console.log('Failure adding cigar', err);
    // });

    //case 1 add cigar to db and brand + name = 'other' to db, then add to
    //users_cigars
    if(vm.brand.brand == 'other'){
      console.log('humcontrl addToBrand');
      CigarService.addToBrand(sendData).then(handleSuccess, handleFailure);
    }

    //case 2 add name and cigar to db and then add to users_cigars
    else if(vm.name.name == 'other'){
      console.log('humcntrl addToCigars');
      CigarService.addToCigars(sendData).then(handleSuccess, handleFailure);
    }

    //case 3 just add to users_cigars
    else if(sendData.name.origin_country == sendData.origin.origin_country &&
    sendData.name.wrapper_color == sendData.wrapperColor.wrapper_color_name &&
    sendData.name.wrapper_country == sendData.wrapperCountry.wrapper_country &&
    // this is where filler check would go
    sendData.name.body == sendData.body.body){
      console.log('humcntrl addToUserCigars');
      CigarService.addToUserCigars(sendData).then(handleSuccess, handleFailure);
    }
    //case 4 update cigars db and then add to users_cigars
    else {
      console.log('humcntrl cigarSave');
      CigarService.cigarSave(sendData).then(handleSuccess, handleFailure);
    }
  };

  function handleSuccess(response){
    console.log('great success', response);
    $location.path('/humidor');
  };

  function handleFailure(response){
    console.log('miserable failure', response);
  };

  //form cancel function routing to /humidor
  vm.cancel = function(){
    $location.path('/humidor');
  };

  vm.editCigars = function(){
    vm.edit.more = !vm.edit.more;
    vm.edit.less = !vm.edit.less;
  };

  vm.saveCigarEdit = function(quantity, size, gauge, condition, comments, id){
    var sendData = {};
    var notSize = true;
    var notGauge = true;

    if(quantity > 0){
      sendData.quantity = quantity;
      console.log('quantity', sendData.quantity);
    }
    for(var i = 0; i < vm.cigarArrays.length; i++){
      if(size == vm.cigarArrays[i].sizes_number){
        sendData.size = vm.cigarArrays[i].id;
        notSize = false;
        console.log('size', sendData.size);
      }
      if(gauge == vm.cigarArrays[i].gauge_number){
        sendData.gauge = vm.cigarArrays[i].id;
        notGauge = false;
        console.log('gauge', sendData.gauge);
      }
    }
    sendData.condition = condition;
    sendData.comments = comments;
    sendData.id = id;
    console.log('condition, comments, cigar id in update', sendData.condition, sendData.comments, sendData.id);
    if(notSize == true && notGauge == true){
      alert('Please use valid Size and Gauge numbers');
      return;
    }
    else if(notSize == true){
      alert('Please use a valid Size number');
      return;
    }
    else if(notGauge == true){
      alert('Please use a valid Gauge number');
      return;
    }
    else{
      console.log('attempting to update cigars_users');
      CigarService.saveCigarEdit(sendData).then(handleEditSuccess, handleEditFailure);
    }
    // console.log('test', quantity, size, gauge, condition, comments);
  };

  function handleEditSuccess(){
    console.log('success editing humidor');
    vm.editCigars();
    $location.path('/humidor');
  };

  function handleEditFailure(){
    alert('Edit failed');
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

  vm.remove = function(index) {
    CigarService.remove(index).then(function(response){
      console.log('success removing cigar.');
      $location.path('/humidor');
    }, function(response){
      console.log('err removing cigar', response);
    });
  };
}]);
