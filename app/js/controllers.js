'use strict';

/* Controllers */

angular
  .module('adhocControllers', [])
  .controller('IssueListController', ['$scope', 'flash', 'Issue', IssueListController])
  .controller('AlgorithmController', ['$scope', '$location', 'flash', 'Algorithm', AlgorithmController])
;

/**
 * Controller for Issue List view.
 */
function IssueListController($scope, flash, Issue) {
  $scope.issues = Issue.query();
  $scope.message = flash.getMessage();
}


/**
 * Controller for new request view.
 */
function AlgorithmController($scope, $location, flash, Algorithm) {
  Algorithm.query()
    .$promise.then(function (data) {
      $scope.algorithms = data;
      $scope.algorithm = data[0];
      $scope.figure = 1;
    }
  );

  $scope.addRequest = function () {
    var params = {
      name: $scope.algorithm.name,
      params: [$scope.figure, $scope.count, $scope.size]
    };
    console.log(params);
    flash.setMessage('Запрос успешно оставлен');
    $location.path("/");
  }
}