'use strict';

/* Controllers */

var adhocControllers = angular.module('adhocControllers', []);

adhocControllers.controller('IssueListController', ['$scope', 'Issue',
  function($scope, Issue) {
    $scope.issues = Issue.query();
  }]);
