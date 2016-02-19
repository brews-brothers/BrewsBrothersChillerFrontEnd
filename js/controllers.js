app.controller('mainController', function($scope, $http, $localStorage, $location) {
  // $scope.user_id = 2;
  $scope.defaultSchedule = [[0, 70], [0.5, 65], [5, 68], [7, 40]];
  // $scope.sampleData = {
  //   name: "Pale Ale - Default",
  //   style: "pale ale",
  //   created: "Wed Feb 17 2016 14:51:24 GMT-0700",
  //   lastRun: "Wed Feb 17 2016 14:51:24 GMT-0700",
  //   favorite: false,
  //   schedule: $scope.defaultSchedule
  // }

  $scope.logout = function(){
    $localStorage.$reset();
    $location.path('/');
  }
});

app.controller('HomeController', function($scope, $http, $location, batch_service){
  $scope.deleteBatch = function(brew){
    console.log(brew);
    $http.delete(config.host +'dashboard/'+brew.id).then(function(successCallback, errorCallback){
      $scope.singleBrew = false;
      for (var i = 0; i < $scope.brews.length; i++) {
        if ($scope.brews[i].id === brew.id) {
          $scope.brews.splice(i);
        }
      }
    });
    // clearBrew();
  };
  batch_service.getBatches().then(function(data){
<<<<<<< HEAD
    console.log(data);
=======
>>>>>>> 98f689017fb96683fd34407aa90f5b056f6102d8
    $scope.brews=data;
  })

  $scope.greeting = 'Welcome Brews Brothers';
  $scope.singleBrew = false;
  $scope.showBatch = function(batch) {
    console.log(batch);
    $scope.singleBrew = true;
    $scope.batch = batch;
  };
  $scope.clear = function() {
    $scope.singleBrew = false;
  };

$scope.brewOn = false;

  $scope.runBatch = function(brew) {
    $http.post(config.host+'dashboard/startbrew',brew);
  };
  $scope.saveBatchData = function(brew) {
    console.log(brew);
    $http.post(config.host+'dashboard/saveBrew', brew);
  };
  $scope.addNote = function(note, batch){
    var noteArray = [note];
    $scope.noteToBeAdded = "";
    batch.notes.push(noteArray);
  }
});

app.controller('LoginController', function($scope, $anchorScroll, $location, $http){
  $scope.place = 'Login'
  $scope.googleauth = function(){
    console.log(config.host);
    window.location= config.host+'auth/google'
  }
  $scope.setUserTest = function() {
    $scope.user.id = 2;
  }
  $scope.toAbout = function() {
   $location.hash('about');
   $anchorScroll();
 };
});
// app.controller('BatchController', function($scope, $stateParams){
//   $scope.place = 'Batch View';
// })

app.controller('NewBrewController', function($scope, $http, batch_service){
  clearBrew();
  $scope.place = 'New Brew';
  $scope.submitBatch = function(){
    $scope.brew.created = new Date();
    $scope.brew.notes = [];
    $scope.brew.lastRun = $scope.brew.created;
    $scope.brew.user_id = $scope.user_id;
    console.log($scope.brew);
    batch_service.createBrew($scope.brew).then(function(){
      // $scope.brews.push($scope.brew);
      clearBrew();
    })
    // brews.push($scope.brew);
    // $http.post('https://chillerdb.herokuapp.com/batch', $scope.brew, config).then(successCallback, errorCallback);
    // $http.post(config.host +'dashboard', $scope.brew).then(function(successCallback, errorCallback){});
    // clearBrew();
  };
  // $scope.deleteBatch = function(brew){
  //   console.log(brew);
  //   $http.delete(config.host +'dashboard', brew).then(function(successCallback, errorCallback){});
  //   clearBrew();
  // };
  $scope.setStyle = function(style){
    var time = new Date();
    $scope.brew.style = style;
    $scope.brew.schedule = [];
    console.log($scope.brew);
    if (style === "Ale") {
      $scope.brew.styleNumber = 1;
      $scope.brew.schedule = $scope.defaultSchedule;
    } else if (style === "Stout") {
      $scope.brew.styleNumber = 2;
      $scope.brew.schedule = $scope.defaultSchedule;
    } else if (style === "Porter") {
      $scope.brew.styleNumber = 3;
      $scope.brew.schedule = $scope.defaultSchedule;
    } else if (style === "Lager") {
      $scope.brew.styleNumber = 4;
      $scope.brew.schedule = $scope.defaultSchedule;
    };
  };
  function clearBrew(){
    $scope.brew = {};
    $scope.brew.style = "Style";
  };
});

app.controller('authController', function($scope, $http,$routeParams,$localStorage, $location){
  //Get token out of header and set in local storage
  console.log($routeParams);
  $localStorage.token = $routeParams.token;
  $location.path('/home')

})
