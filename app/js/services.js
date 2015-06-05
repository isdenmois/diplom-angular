'use strict';

/* Services */

var adhocServices = angular.module('adhocServices', ['ngResource']);

adhocServices
  .factory('Issue', ['$resource',
    function ($resource) {
      return $resource('/issue/:issueId.json', {}, {
        query: {method: 'GET', params: {issueId: 'issue'}, isArray: true}
      });
    }]
)
  .factory('Algorithm', ['$resource',
    function ($resource) {
      return $resource('/algorithms', {}, {query: {method: 'GET', isArray: true}});
    }]
);
