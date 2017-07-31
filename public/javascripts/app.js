/**
 * Created by fredericlopesgoncalvesmagalhaes on 06.03.17.
 */
angular.module('starter', [
  'starter.controllers',
  'btford.socket-io',
  'starter.directives',
  'starter.services',
  'starter.services-event',
  'starter.services-auth',
  'starter.services-iot',
  'starter.constants',
  'ui.router'])

    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

      $locationProvider.html5Mode(true);

      // Learn more here: https://github.com/angular-ui/ui-router
      // Set up the various states which the app can be in.
      // Each state's controller can be found in controllers.js
      $stateProvider

          .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
          })

          // setup an abstract state for the navbar directive
          .state('nav', {
            url: '',
            abstract: true,
            templateUrl: 'templates/navbar.html',
            controller: 'NavCtrl'
          })

          // Each tab has its own nav history stack:
          .state('nav.dash', {
            url: '/dash',
            views: {
              'content': {
                templateUrl: 'templates/nav-dash.html',
                controller: 'DashCtrl'
              },
              'dashCol1@nav.dash': {
                templateUrl: 'templates/dashboard/dash-column-1.html',
                controller: 'DashColumn1Ctrl'
              },
              'dashCol2@nav.dash': {
                templateUrl: 'templates/dashboard/dash-column-2.html',
                controller: 'DashColumn2Ctrl'
              }
            }
          })

          .state('nav.events', {
            url: '/events',
            views: {
              'content': {
                templateUrl: 'templates/nav-events.html',
                controller: 'EventsCtrl'
              }
            }
          })

          .state('nav.event-detail', {
            url: '/events/:id',
            views: {
              'tab-events': {
                templateUrl: 'templates/event-detail.html',
                controller: 'EventDetailCtrl'
              }
            }
          })

          .state('nav.settings', {
            url: '/settings',
            views: {
              'content': {
                templateUrl: 'templates/nav-settings.html',
                controller: 'SettingsCtrl'
              }
            }
          })

          .state('nav.countries', {
            url: '/settings/countries',
            views: {
              'content-settings': {
                templateUrl: 'templates/setting-countries.html',
                controller: 'CountriesCtrl'
              }
            }
          });

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/login');
    })

    .run(function ($rootScope, $state, AuthService) {
      $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
        if (!AuthService.isAuthenticated()) {
          console.log(next.name);
        }
      });
    });
