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
                //console.log(scope.onFinish);
                var name = $('#set1 md-select')[0].val;
                var count = $('#set1 md-select')[1].val;
                scope.senario.push({name: name, count: count});
                scope.onFinish();
            };
        }
    }
})
