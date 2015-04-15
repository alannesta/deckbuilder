angular.module('deckbuilder').directive('csjDrop', function() {
    return {
        restrict: 'A',
        scope: {
            onDrop: '&',
            cardList: '='
        },
        link: function(scope, element) {
            var el = element[0];

            el.addEventListener('dragenter', function(event) {
                console.log('dragenter');
            });

            el.addEventListener('dragleave', function(event) {
                console.log('dragleave');
            }, false);

            el.addEventListener('dragover', function(event) {
                event.preventDefault();   // this will allow the item to "drop"
            }, false);

            el.addEventListener('drop', function(event) {
                var data = event.dataTransfer.getData("card");
                //console.log(JSON.parse(data));
                scope.$apply(function(){
                    scope.cardList.push(JSON.parse(data));
                });
            });
        }
    }
})
