'use strict';

/* Services */

angular
  .module('adhocServices', ['ngResource'])
  .factory('Issue', ['$resource', Issue])
  .factory('Algorithm', ['$resource', Algorithms])
  .factory('flash', flash)
  .factory('humanNames', humanNames);
;


/**
 * Service for retrieve issues.
 */
function Issue($resource) {
  return $resource('/issue/:issueId.json', {issueId: 'issue'});
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

/**
 * Service for human-readable naming.
 */
function humanNames() {
  return {
    human: function (word) {
      name = '';

      switch (word) {
        case 'mds':
          name = 'Минимальное доминирующее множество';
          break;

        case 'bridge':
          name = 'Поиск мостов';
          break;

        case 'circle':
          name = 'Круг';
          break;

        case 'square':
          name = 'Квадрат';
          break;

        case 'rectangle':
          name = 'Прямоугольник';
          break;

        case 'dispersia':
          name = 'Дисперсия';
          break;

        case 'math_exp':
          name = 'Математическое ожидание';
          break;
      }

      return name;
    }
  };
}
