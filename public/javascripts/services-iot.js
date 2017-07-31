/**
 * Created by fredericlopesgoncalvesmagalhaes
 * @copyright Frederic Lopes Goncalves Magalhaes 2017
 */
angular.module('starter.services-iot', [])

.factory('IoT', function($http, $q, API_ENDPOINT) {

  var allRooms = function() {
    return $q(function(resolve, reject){
      $http.post(API_ENDPOINT.url + '/iot/rooms').then(function(result){
        if(result.data.success){
          console.log("resolved");
          resolve(result.data.rooms);
        } else {
          console.log('rejected');
          reject(result.data.msg);
        }
      })
    });
  };

  /*
  var iotRoom = function(id) {
    return $q(function(resolve, reject){
      $http.post(API_ENDPOINT.url + '/room/' + id).then(function(result){
        if(result.data.success){
          console.log("resolved");
          resolve(result.data.objects)
        } else {
          console.log('rejected');
          reject(result.data.msg);
        }
      })
    });
  };
  */

  return {
    allRooms: function() {return allRooms();}
    //iotRoom: iotRoom
  }

})

.factory('SocketService', ['socketFactory', 'API_ENDPOINT', function(socketFactory, API_ENDPOINT){
  var mysocket = io.connect(API_ENDPOINT.socketUrl);
  var SocketService = socketFactory({
    ioSocket: mysocket
  });

  return SocketService
}]);























