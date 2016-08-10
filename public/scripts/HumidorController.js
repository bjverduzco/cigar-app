angular.module('cigarApp').controller('HumidorController', ['$http', '$location', 'CigarService', function($http, $location, CigarService){
  var vm = this;

  //cigarData from CigarService to populate data/form
  vm.cigarData = CigarService.cigarData;
  // console.log('cigarData', vm.cigarData);

  // //arrays for sizes and gauges
  // vm.sizes = [{number: 3.4}, {number: 3.9}, {number: 4}, {number: 4.3}, {number: 4.5}, {number: 4.8}, {number: 5}, {number: 5.5},
  //   {number: 5.6}, {number: 5.7}, {number: 6}, {number: 6.1}, {number: 6.2}, {number: 6.4}, {number: 6.5}, {number: 7}, {number: 7.6}, {number: 9.2}];
  // vm.gauges = [{number: 18}, {number: 20}, {number: 22}, {number: 24}, {number: 26}, {number: 28}, {number: 30}, {number: 32}, {number: 34}, {number: 36}, {number: 38}, {number: 40}, {number: 42}, {number: 44}, {number: 46}, {number: 48}, {number: 50}, {number: 52}, {number: 54}, {number: 56}, {number: 58}, {number: 60}, {number: 62}, {number: 64}, {number: 66}, {number: 68}, {number: 70}, {number: 72}, {number: 74}, {number: 76}, {number: 78}];
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
  // //brand name origin filler body wrapper
  // vm.cigarData.fillerAll = [{country: 'Brazil'}, {country: 'Barbados'}, {country: 'Cameroon'},
  // {country: 'Costa Rica'}, {country: 'Cuba'}, {country: 'Dominican Republic'},
  // {country: 'Honduras'}, {country: 'Indonesia'}, {country: 'Italy'}, {country: 'Jamaica'},
  // {country: 'Mexico'}, {country: 'Ecuador'}, {country: 'Nicaragua'}, {country: 'Other'},
  // {country: 'Panama'}, {country: 'Peru'}, {country: 'Philippines'}, {country: 'Puerto Rico'},
  // {country: 'Canary Islands(Spain)'}, {country: 'United States'}];
  // vm.cigarData.wrapperColor = [{name: 'Candela(Double Claro)', description: 'very light,'
  // + ' slightly greenish. Achieved by picking leaves before maturity and drying'
  // + ' quickly, the color coming from retained green chlorophyll'},
  // {name: 'Claro', description: 'very light tan or yellowish'},
  // {name: 'Colorado Claro', description: 'medium brown'},
  // {name: 'Colorado(Rosado)', description: 'reddish-brown'},
  // {name: 'Colorado Maduro', description: 'darker brown'},
  // {name: 'Maduro', description: 'very dark brown'},
  // {name: 'Oscuro(Double Maduro)', description: 'black'},
  // {name: 'American Market Selection(AMS)', description: 'synonymous with Candela("Double Claro")'},
  // {name: 'English Market Selection(EMS)', description: 'any natural colored wrapper which is darker than Candela but lighter than Maduro'},
  // {name: 'Spanish Market Selection(SMS)', description: 'one of the two darkest colors, Maduro or Oscuro'}];
  // vm.cigarData.wrapperCountry = [{country: 'Brazil'}, {country: 'Cameroon'}, {country: 'Connecticut Broadleaf'},
  // {country: 'Connecticut Shade'}, {country: 'Costa Rica'}, {country: 'Cuba'},
  // {country: 'Dominican Republic'}, {country: 'Ecuador'}, {country: 'Honduras'},
  // {country: 'Indonesia Besuki'}, {country: 'Indonesia Sumatra'}, {country: 'Mexico'},
  // {country: 'Nicaragua'}, {country: 'Other'}];
  // vm.cigarData.originAll = [{country: 'Brazil'}, {country: 'Barbados'}, {country: 'Cameroon'},
  // {country: 'Costa Rica'}, {country: 'Cuba'}, {country: 'Dominican Republic'},
  // {country: 'Ecuador'}, {country: 'Holland'}, {country: 'Honduras'}, {country: 'Indonesia'},
  // {country: 'Italy'}, {country: 'Jamaica'}, {country: 'Mexico'}, {country: 'Nicaragua'},
  // {country: 'Other'}, {country: 'Panama'}, {country: 'Peru'}, {country: 'Philippines'},
  // {country: 'Puerto Rico'}, {country: 'Canary Islands(Spain)'}, {country: 'United States'}];
  // vm.cigarData.body = [{name: 'Mild'}, {name: 'Mild-medium'}, {name: 'Medium'}, {name: 'Medium-full'}, {name: 'Full'}];

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
        vm.edit.name = false;
        vm.required.secondaryName = true;
      }
      if(vm.name.name !== 'other'){
        vm.edit.name = true;
        vm.required.secondaryName = true;
        vm.wrapperColor = vm.name.wrapperColor;
        for(var i = 0; i < vm.cigarData.originAll.length; i++){
          if(vm.name.origin == vm.cigarData.originAll[i].country){
            vm.origin = vm.cigarData.originAll[i];
          }
          else if(vm.name.origin == '' | vm.name.origin == null){
            vm.origin = '';
          }
        }
        for(var i = 0; i < vm.cigarData.wrapperColor.length; i++){
          if(vm.name.wrapperColor == vm.cigarData.wrapperColor[i].name){
            vm.wrapperColor = vm.cigarData.wrapperColor[i];
          }
          else if(vm.name.wrapperColor == '' | vm.name.wrapperColor == null){
            vm.wrapperColor = '';
          }
        }
        for(var i = 0; i < vm.cigarData.wrapperCountry.length; i++){
          if(vm.name.wrapperCountry == vm.cigarData.wrapperCountry[i].country){
            vm.wrapperCountry = vm.cigarData.wrapperCountry[i];
          }
          else if(vm.name.wrapperCountry == '' | vm.name.wrapperCountry == null){
            vm.wrapperCountry = '';
          }
        }
        vm.filler = [];
        //doesnt work!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        for(var i = 0; i < vm.name.filler.length; i++){
          if(vm.name.filler !== '' | vm.name.filler !== null){
            for(var j = 0; j < vm.cigarData.fillerAll.length; j++){
              if(vm.name.filler[i] == vm.cigarData.fillerAll[j].country){
                vm.filler.push(vm.cigarData.fillerAll[j]);
                console.log(vm.filler);
              }
            }
          }
          else {
            vm.filler = '';
          }
        }
        for(var i = 0; i < vm.cigarData.body.length; i++){
          if(vm.name.body == vm.cigarData.body[i].name){
            vm.body = vm.cigarData.body[i];
          }
          else if(vm.name.body == '' | vm.name.body == null){
            vm.body = '';
          }
        }

      }
    }
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

  //functions to show more or less options
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

    //if brand dropdown option other is chosen, newBrand becomes a required field
    //making newBrand the data that needs to be added to the db
    if(vm.newBrand === ''){
      sendData.brand = vm.brand;
    }
    else{
      sendData.brand = vm.newBrand;
    }

    //if name dropdown option other is chosen, newName becomes a required field
    //making newName the data that needs to be added to the db
    if(vm.newName === ''){
      sendData.name = vm.name;
    }
    else{
      sendData.name = vm.newName;
    }

    //saving the form data into sendData obj to be passed
    sendData.date = vm.date;
    sendData.picUpload = vm.picUpload;
    sendData.quantity = vm.quantity;
    sendData.size = vm.size.number;
    sendData.gauge = vm.gauge.number;
    sendData.origin = vm.origin;
    sendData.wrapperColor = vm.wrapperColor;
    sendData.wrapperCountry = vm.wrapperCountry;
    sendData.filler = vm.filler;
    sendData.body = vm.body;
    sendData.condition = vm.condition;
    sendData.comments = vm.comments;

    console.log(sendData);

    //posting the info to the db and routing if successful to /humidor
    $http.post('/humidor/addACigar', sendData).then(function(response){
      console.log('success adding cigar', response);
      $location.path('/humidor');
    }, function(err){
      console.log('Failure adding cigar', err);
    });

  };

  //form cancel function routing to /humidor
  vm.cancel = function(){
    $location.path('/humidor');
  };
}]);
