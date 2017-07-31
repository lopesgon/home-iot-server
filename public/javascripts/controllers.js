/**
 * Created by fredericlopesgoncalvesmagalhaes
 * @copyright Frederic Lopes Goncalves Magalhaes 2017
 */
angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, AUTH_EVENTS, AuthService){
  $scope.$on(AUTH_EVENTS.notAuthorized, function(event){
    window.alert('Unauthorized! You are not authorized to access to this resource.');
  });

  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event){
    AuthService.logout();
    $state.go('/login');
    window.alert('Session lost! Please, you have to login again.');
  });

})

.controller('NavCtrl', function($scope, AuthService){
  $scope.logout = function(){
    AuthService.logout();
  };

  $scope.username = AuthService.getUsername();
})

.controller('LoginCtrl', function($scope, AuthService, $state) {
  $scope.user = {
    name: '',
    password: ''
  };

  $scope.login = function() {
    AuthService.login($scope.user).then(function(msg) {
      $state.go('nav.dash');
    }, function(errMsg) {
      var alertPopup = function(){
        console.log("LoginCtrl -> TODO: ALERT MSG")
      }
    });
  };
})

.controller('DashCtrl', function($state, $scope, EmergencyNumbers, AuthService) {

  $scope.logout = function(){
    AuthService.logout();
    $state.go('/login');
  }

})
  .controller('DashColumn1Ctrl', function($scope, API_ENDPOINT){
    $scope.custom = "Custom Dashboard";
    $scope.videoUrl = API_ENDPOINT.url + "/events/video/58eb8ebba853070321eb239f";
  })
  .controller('DashColumn2Ctrl', function($scope, IoT, SocketService){

    $scope.selectedRoom = {
      id: ''
    };

    IoT.allRooms().then(function(rooms) {
      $scope.rooms = rooms;
    }, function(errMsg) {
      console.log("ERROR HANDLER ON DashColumn2Ctrl: " + errMsg);
    });

    function getObjects(id){
      var data = $scope.rooms;
      for(var i=0; i < data.length; i++){
        if(data[i]._id == id){
          var currentRoom = data[i];
          return currentRoom.objects;
        }
      }
    }

    $scope.update = function(){
      SocketService.emit('join:room', $scope.selectedRoom);
      var objs = getObjects($scope.selectedRoom.id);
      $scope.objects = objs;
    };

    $scope.toggleEvent = function(obj){
      var msg = {
        room: $scope.selectedRoom.id,
        object: {
          name: obj.name,
          checked: obj.checked,
          gpio: obj.gpio
        }
      };
      SocketService.emit('room:object', msg, function(res){
        console.log("Callback from server");
      });
    };

    SocketService.on('message', function(msg){
      if(msg.success) {
        var objs = getObjects(msg.room);
        for (var i = 0; i < objs.length; i++) {
          if (objs[i].name == msg.object.name) {
            objs[i].checked = msg.object.checked;
            break;
          }
        }
      }
    });

  })

.controller('EventsCtrl', function($scope, Events) {
  $scope.events = [];
  $scope.hasMoreData = true;

  Events.loadEvents().then(function(res){
    $scope.events = res;
  }, function(errMsg) {
    console.log("ERROR HANDLER: " + errMsg);
  });

  $scope.loadOldEvents = function(){
    var length = $scope.events.length;
    if(length>0){
      Events.getOldEvents($scope.events[length - 1].id).then(function(res){
        if(res.length == 0){$scope.hasMoreData = false;}
        $scope.events = $scope.events.concat(res);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    }
  };

  $scope.delete = function(event) {
    Events.delete(event).then(function(){
      $scope.events.splice($scope.events.indexOf(event), 1);
    }, function(err){
      console.log("ERROR HANDLER ON: " + err);
    });
  };

  $scope.setCurrentEvent = function(event){
    Events.setCurrentEvent(event);
  }

})

.controller('EventDetailCtrl', function($scope, $sce, $stateParams, $state, Events, API_ENDPOINT) {
  $scope.event = Events.getCurrentEvent();
  $scope.resourceUrl = $sce.trustAsResourceUrl(API_ENDPOINT.url + '/events/video/' + $scope.event._id);

  $scope.deleteConfirmation = function() {
    $scope.delete = function(event){
      alert("TO DELETE:" + event._id);
    };
  }
})

.controller('SettingsCtrl', function($scope, SocketService) {

  SocketService.on('systemStateChange', function(data){
    $scope.system.enable = data;
  });

  $scope.system = {
    enable: false
  };

  $scope.account = {
    user: ''
  };

  $scope.systemChange = function(){
    SocketService.emit('systemStateChange', $scope.system.enable);
  };

  $scope.emergencyNumbers;
})

.controller('CountriesCtrl', function($scope, $stateParams, Settings) {

  $scope.countries = Settings.allCountries();

  $scope.current = Settings.getCurrentCountry();

  $scope.countryChange = function(country) {
    Settings.setCurrentCountry(country);
    $scope.current = country;
  };
});
