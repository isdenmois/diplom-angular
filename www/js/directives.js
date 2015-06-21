'use strict';

/* Directives */

angular
  .module('adhocDirectives', [])
  .directive('backButton', backButton)
  .directive('chart', chartDirective)
;

/**
 * Directive for change location to previous path.
 */
function backButton() {
  return {
    restrict: 'A',

    link: function (scope, element) {
      element.bind('click', goBack);

      function goBack() {
        history.back();
        scope.$apply();
      }
    }
  }
}

/**
 * Directive for display chart.
 */
function chartDirective() {
  return {
    restrict: 'E',
    template: '<div></div>',
    scope: {
        chartData: "=value",
        chartObj: "=?"
    },
    transclude: true,
    replace: true,
    link: function($scope, $element, $attrs) {

      //Update when charts data changes
      $scope.$watch('chartData', function(value) {
        if (!value)
            return;

        // Initiate the chartData.chart if it doesn't exist yet
        $scope.chartData.chart = $scope.chartData.chart || {};
        $scope.chartData.tooltip = $scope.chartData.tooltip || {shared: true, crosshairs: true};
        $scope.chartData.plotOptions = $scope.chartData.plotOptions || {series: {}};
        $scope.chartData.xAxis = $scope.chartData.xAxis || {title: {text: 'Количество вершин'}};
        $scope.chartData.yAxis = $scope.chartData.yAxis || {title: {text: 'Значение'}, min: 0};

        // use default values if nothing is specified in the given settings
        $scope.chartData.chart.renderTo = $scope.chartData.chart.renderTo || $element[0];
        if ($attrs.type)
            $scope.chartData.chart.type = $scope.chartData.chart.type || $attrs.type;
        if ($attrs.height)
            $scope.chartData.chart.height = $scope.chartData.chart.height || $attrs.height;
        if ($attrs.width)
            $scope.chartData.chart.width = $scope.chartData.chart.width || $attrs.width;

        $scope.chartData.plotOptions.series.pointStart = 2;
        $scope.chartObj = new Highcharts.Chart($scope.chartData);
      });
    }
  };
}