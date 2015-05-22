(function() {

    angular
        .module('deckbuilder')
        .controller('UploadController', uploadController);

    function uploadController($scope) {

        var self = this;

        self.step = 1;
        self.selections = [];

        self.save = function() {

        };

        self.restart = function() {
            self.step = 1;
            self.selections = [];
        };

        function forward(val) {
            self.selections.push(val);
            self.step++;
        }

        $scope.$watch(function() {
            return self.rarity;
        }, function(val) {
            if (val) {
                forward(val);
            }
        });

        $scope.$watch(function() {
            return self.class;
        }, function(val) {
            if (val) {
                forward(val);
            }
        });

        $scope.$watch(function() {
            return self.cost;
        }, function(val) {
            if (val) {
                forward(val)
            }
        });

        $scope.$watch(function() {
            return self.selections;
        }, function() {
            self.step = self.selections.length + 1;
        }, true);

    }
})();
