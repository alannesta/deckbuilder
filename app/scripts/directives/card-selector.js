angular.module('deckbuilder').directive('cardSelector', function() {
    return {
        restrict: 'E',
        scope: {
          senario: '=ngModel',
          onFinish: '&'
        },
        templateUrl: 'views/templates/card-selector.html',
        link: function(scope, element, attrs) {
            scope.finish = function() {
                console.log(scope.onFinish);
                scope.onFinish();
            };
        }
    }
})
