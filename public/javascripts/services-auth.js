/**
 * Created by fredericlopesgoncalvesmagalhaes
 * @copyright Frederic Lopes Goncalves Magalhaes 2017
 */
angular.module('starter.services-auth', [])

.service('AuthService', function($q, $http, API_ENDPOINT) {
  var LOCAL_TOKEN_KEY = 'INTELL_SECU_TK';
  var isAuthenticated = false;
  var authToken = '';
  var username = '';

  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }

  function storeUserCredentials(user, token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(user, token);
  }

  function useCredentials(user, token) {
    // username = user;
    // authToken = token;
    isAuthenticated = true;
    $http.defaults.headers.common['Authorization'] = token;

    // $http.defaults.headers.common['X-Auth-Token'] = token;
    // Set the token as header for your requests!
  }

  function destroyUserCredentials() {
    authToken = '';
    isAuthenticated = false;
    username = '';
    //$http.defaults.headers.common.Authorization = undefined;
    $http.defaults.headers.common['X-Auth-Token'] = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }

  var login = function(user) {
    return $q(function(resolve, reject) {
      $http.post(API_ENDPOINT.url + '/auth/authenticate', user).then(function(result) {
        if (result.data.success) {
          storeUserCredentials(user.name, result.data.token);
          // storeUserCredentials(result.data.token); // PREVIOUS VERSION
          resolve(result.data.msg);
        } else {
          reject(result.data.msg);
        }
      });
    });
  };

  var logout = function() {
    destroyUserCredentials();
  };

  loadUserCredentials();

  return {
    login: login,
    logout: logout,
    isAuthenticated: function() {return isAuthenticated;},
    getUsername: function() {return username}
  };
})

.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized
      }[response.status], response);
      return $q.reject(response);
    }
  };
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});
