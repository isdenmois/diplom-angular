'use strict';

/* Controllers */

angular
  .module('adhocControllers', [])
  .controller('IssueListController', ['$scope', 'flash', 'humanNames', 'Serve', IssueListController])
  .controller('AlgorithmController', ['$scope', '$location', 'flash', 'Serve', AlgorithmController])
  .controller('ResultController', ['$scope', '$routeParams', 'humanNames', 'Serve', ResultController])
;

/**
 * Controller for Serve List view.
 */
function IssueListController($scope, flash, humanNames, Serve) {
  Serve.query()
    .$promise.then(function (result) {
      angular.forEach(result, function(index) {
        var name = humanNames.human(index.algorithm) + '. ';
        name += humanNames.human(index.area) + ', ';
        name += '' + index.size + ', ' + index.step;
        index.name = name;
      });
      $scope.issues = result;
    });
  
  $scope.message = flash.getMessage();
}


/**
 * Controller for new request view.
 */
function AlgorithmController($scope, $location, flash, Serve) {
  Serve.query({issueId:'algorithms'})
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

/**
 * Controller for result view.
 */
function ResultController($scope, $routeParams, humanNames, Serve) {
  var id = ($routeParams.id || false);
  if (id) {
    Serve.get({issueId: id})
      .$promise.then(function (result) {
        $scope.params = [
          {
            name: 'Алгоритм',
            value: humanNames.human(result.algorithm)
          },
          {
            name: 'Область',
            value: humanNames.human(result.area)
          },
          {
            name: 'Количество повторений',
            value: result.step
          },
          {
            name: 'Размер области',
            value: result.size
          }
        ];
        var data = {
          title: {
            text: humanNames.human(result.algorithm)
          },
          series: []
        };

        angular.forEach(result.series, function(seria) {
          data.series.push({
            name: humanNames.human(seria.name),
            data: seria.data
          });
        });

        $scope.dataChart = data;
    });
  }
}