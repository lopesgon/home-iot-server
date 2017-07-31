/**
 * Created by fredericlopesgoncalvesmagalhaes
 * @copyright Frederic Lopes Goncalves Magalhaes 2017
 */
angular.module('starter.directives', [])

.directive('myEventDirective', ['$compile', '$sce', 'API_ENDPOINT', function($compile, $sce, API_ENDPOINT){
  var imgTemplate = '<img class="eventDocument" src="' + API_ENDPOINT.url + '/events/image/{{event._id}}" />';
  var videoTemplate = '<video controls="controls" preload="metadata" webkit-playsinline="webkit-playsinline" class="eventDocument">' +
      '<source ng-src="{{resourceUrl}}" type="video/mp4"/></video>';

  var getTemplate = function(contentType){
    var template = imgTemplate;
    switch(contentType){
      case 'mp4':
        template = videoTemplate;
    }
    return template;
  };

  return {
    restrict: 'EAC',
    replace: true,
    link: function(scope, element, attrs) {
      element.html(getTemplate(scope.event.contentType));
      $compile(element.contents())(scope);
    }
  }
}]);
