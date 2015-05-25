(function() {

    angular
        .module('deckbuilder')
        .controller('UploadController', uploadController);

    function uploadController($scope) {

        var self = this;

        self.step = 1;
        self.selections = [];   // chip collection
        self.senarios = [];      // card combinations
        self.forward = forward;

        self.save = function() {

        };

        self.restart = function() {
            self.step = 1;
            self.selections = [];
            self.senario = [];
            self.class = null;
            self.cost = null;
        };

        function forward(val) {
            console.log('forward?');
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
