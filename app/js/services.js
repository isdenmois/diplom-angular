'use strict';

/* Services */

angular
  .module('adhocServices', ['ngResource'])
  .factory('Issue', ['$resource', Issue])
  .factory('Algorithm', ['$resource', Algorithms])
  .factory('flash', flash)
;


/**
 * Service for retrieve issues.
 */
function Issue($resource) {
  return $resource('/issue/:issueId.json', {}, {
    query: {method: 'GET', params: {issueId: 'issue'}, isArray: true}
  });
}


/**
 * Service for retrieve algorithms.
 */
function Algorithms($resource) {
  return $resource('/algorithms', {}, {query: {method: 'GET', isArray: true}});
}


/**
 * Service for messaging.
 */
function flash($rootScope) {
  var queue = [];
  var currentMessage = "";

  $rootScope.$on("$routeChangeSuccess", function () {
    currentMessage = queue.shift() || "";
  });

  return {
    setMessage: function (message) {
      queue.push(message);
    },
    getMessage: function () {
      return currentMessage;
    }
  };
}
