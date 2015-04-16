angular.module('deckbuilder').directive('csjDrop', function() {
    return {
        restrict: 'A',
        scope: {
            onDrop: '&'
        },
        link: function(scope, element) {
            var el = element[0];

            el.addEventListener('dragenter', function(event) {
                event.preventDefault();
            });

            el.addEventListener('dragleave', function(event) {
                event.preventDefault();
            });

            el.addEventListener('dragover', function(event) {
                event.preventDefault();   // this will allow the item to "drop"
            });

            el.addEventListener('drop', function(event) {
                var data = event.dataTransfer.getData("card");

                console.log(JSON.parse(data));
                scope.$apply(function(){
                    //scope.cardList.push(JSON.parse(data));
                    scope.onDrop({card: JSON.parse(data)});
                });
            });
        }
    }
})
