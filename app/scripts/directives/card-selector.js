angular.module('deckbuilder').directive('cardSelector', function() {
    return {
        restrict: 'E',
        scope: {
          card: '=ngModel'
        },
        templateUrl: 'views/templates/card-selector.html',
        link: function(scope, element, attrs) {

        }
    }
})
