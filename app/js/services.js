'use strict';

/* Services */

var adhocServices = angular.module('adhocServices', ['ngResource']);

adhocServices.factory('Issue', ['$resource',
  function($resource){
    return $resource('issues/:issueId.json', {}, {
      query: {method:'GET', params:{issueId:'issue'}, isArray:true}
    });
  }]);
