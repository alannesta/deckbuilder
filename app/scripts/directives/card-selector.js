angular.module('deckbuilder').directive('cardSelector', function() {
    return {
        restrict: 'E',
        scope: {
          senarios: '=ngModel',
          onFinish: '&'
        },
        templateUrl: 'views/templates/card-selector.html',
        link: function(scope, element, attrs) {

            scope.senarios = [];
            scope.senarios.push({});

            scope.finish = function() {
                scope.onFinish({val: scope.senarios});
            };

            scope.add = function() {
                scope.senarios.push({});
            };

            scope.delete = function(item) {
                scope.senarios.splice(scope.senarios.indexOf(item), 1);
            }
        }
    }
})
