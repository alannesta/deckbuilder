angular.module('deckbuilder').directive('csjDrag', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var el = element[0];

            el.draggable = 'true';  // set html5 draggable attribute

            el.addEventListener('dragstart', function(event) {
                event.dataTransfer.effectAllowed = "move";
                var card = JSON.stringify(scope.$eval(attrs.card));
                event.dataTransfer.setData("card", card);
            });

            el.addEventListener('dragend', function(event) {
            });
        }
    }
})
