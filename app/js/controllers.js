'use strict';

/* Controllers */

var adhocControllers = angular.module('adhocControllers', []);

adhocControllers
  .controller('IssueListController', ['$scope', 'flash', 'Issue',
    function ($scope, flash, Issue) {
      $scope.issues = Issue.query();
      $scope.message = flash.getMessage();
    }])
  .controller('AlgorithmController', ['$scope', '$location', 'flash', 'Algorithm',
    function ($scope, $location, flash, Algorithm) {
      $scope.algorithms = Algorithm.query().$promise.then(function (data) {
        $scope.algorithms = data;
        $scope.algorithm = data[0];
        $scope.figure = 1;
      });

      $scope.addRequest = function () {
        var params = {
          name: $scope.algorithm.name,
          params: [$scope.figure, $scope.count, $scope.size]
        };
        console.log(params);
        flash.setMessage('Запрос успешно оставлен');
        $location.path("/");
      }
    }])
;
