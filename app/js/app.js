'use strict';

/* App Module */

var adhocApp = angular.module('adhocApp', [
  'ngRoute',
  'adhocControllers',
  'adhocServices'
]);

adhocApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/issue', {
        templateUrl: 'views/issue-list.html',
        controller: 'IssueListController'
      }).
      otherwise({
        redirectTo: '/issue'
      });
  }]);
