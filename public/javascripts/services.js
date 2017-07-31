/**
 * Created by fredericlopesgoncalvesmagalhaes
 * @copyright Frederic Lopes Goncalves Magalhaes 2017
 */
angular.module('starter.services', [])

.factory('$localStorage', function($window){

  return {
    set: function(key, value){
      $window.localStorage[key] = value;
    },

    get: function(key, defaultValue) {
      return $window.localStorage[key] || false;
    },

    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },

    getObject: function(key) {
      if($window.localStorage[key] != undefined)
        return JSON.parse($window.localStorage[key] || false );

      return false;
    },

    remove: function(key){
      $window.localStorage.removeItem(key);
    },

    clear: function(){
      $window.localStorage.clear();
    }
  }

})

.factory('Events', function($http) {
  // Might use a resource here that returns a JSON array

  var events = {};
  var currentEvent = {};

  return {
    all: function() {
      return events;
    },
    remove: function(event) {
      events.splice(events.indexOf(event), 1);
    },
    get: function(eventId) {

      /* // FOR A STATIC DATA - AJAX + JSON TO IMPLEMENT
      for (var i = 0; i < events.length; i++) {
        if (events[i].id === parseInt(eventId)) {
          return events[i];
        }
      }
      return null;
      */
    }
  };
})

.factory('EmergencyNumbers', function() {

  // FOR TESTING PURPOSE
  var differentCountry = [{
    type: 'abc',
    number: 117
  }, {
    type: 'def',
    number: 118
  }, {
    type: 'ghi',
    number: 119
  }];

  var defaultNumbers = [{
    type: 'Fire',
    number: 000
  }, {
    type: 'Police',
    number: 000
  }, {
    type: 'Ambulance',
    number: 000
  }];

  var customNumbers = [{
    type: 'Mom',
    number: 000
  }, {
    type: 'Father',
    number: 000
  }];

  return {
    allDefault: function(){
      return defaultNumbers;
    },

    allCustoms: function(){
      return customNumbers
    },

    set: function(countryId){
      defaultNumbers = differentCountry;
    }
  }

})

.factory('Settings', function($localStorage){

  // FAKE DB FOR TESTING
  var countries = [{
    id: 0,
    name: "Germany"
  }, {
    id: 1,
    name: "Switzerland"
  }, {
    id: 2,
    name: "Finland"
  }, {
    id: 3,
    name: "France"
  }, {
    id: 4,
    name: "Portugal"
  }];
  // END

  var country = {};
  if($localStorage.getObject('country') == null){
    country = countries[1];
  }else{
    country = $localStorage.getObject('country');
  }

  return {
    allCountries: function(){
      return countries;
    },

    getCurrentCountry: function(){
      return country;
    },

    setCurrentCountry: function(newCountry){
      this.country = newCountry;
      $localStorage.setObject('country', newCountry);
    }
  }

})

.factory('Camera', function($q){

  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }

});























