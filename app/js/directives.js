'use strict';

/* Directives */

angular
  .module('adhocDirectives', [])
  .directive('backButton', backButton)
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