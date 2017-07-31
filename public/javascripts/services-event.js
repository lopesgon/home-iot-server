/**
 * Created by fredericlopesgoncalvesmagalhaes
 * @copyright Frederic Lopes Goncalves Magalhaes 2017
 */
angular.module('starter.services-event', [])

.factory('Events', ['$http', '$q', 'API_ENDPOINT', function($http, $q, API_ENDPOINT) {
  // Might use a resource here that returns a JSON array

  var currentEvent = {};

  var loadEvents = function(params){
    return $q(function(resolve, reject){
      $http.post(API_ENDPOINT.url + '/events/' + params.id).then(function(result){
        if(result.data.success){
          console.log("resolved");
          resolve(result.data.events);
        } else {
          console.log('rejected');
          reject(result.data.msg);
        }
      })
    });
  };

  return {
    loadEvents: function() {
      var params = {id:0};
      return loadEvents(params);
    },
    delete: function(event) {
      return $q(function(resolve, reject){
        $http.post(API_ENDPOINT.url + '/events/delete', {fileId: event._id}).then(function(result){
          if(result.data.success){
            console.log("resolved");
            resolve();
          }else{
            console.log('rejected');
            reject(result.msg);
          }
        });
      });
    },
    getNewEvents: function(firstId){
      var params = {id: firstId};
      return loadEvents(params);
    },
    getOldEvents: function(lastId){
      var params = {id: lastId};
      return loadEvents(params);
    },
    setCurrentEvent: function(evt){
      currentEvent = evt;
    },
    getCurrentEvent: function(id){
      return currentEvent;
    }
  };
}]);
