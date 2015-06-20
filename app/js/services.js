'use strict';

/* Services */

angular
  .module('adhocServices', ['ngResource'])
  .factory('Serve', ['$resource', Serve])
  .factory('flash', flash)
  .factory('humanNames', humanNames);
;


/**
 * Service for retrieve issues.
 */
function Serve($resource) {
  return $resource('static/:issueId.json', {issueId: 'issue'});
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
      var name = '';

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
