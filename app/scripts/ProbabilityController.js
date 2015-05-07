(function(){
    angular
        .module('deckbuilder')
        .controller('ProbabilityController', probabilityController);

    function probabilityController(MathUtil){
        var self = this;
        var C = MathUtil.combination;   // alias for MathUtil.combination
        self.cardOnTime = cardOnTime;
        self.comboSuccess = comboSuccess;

        /**
         * @name cardOnTime
         * @kind function
         *
         * @param {array} the senario which contains cards information
         * @param {number} the target cost at which the card is expected
         * @param {boolean} true for start first, false for start second
         *
         * @returns string - the probability
         */
        function cardOnTime(count, cost, goFirst) {
            var prob;
            var cardsDrawed = cardsDrawedAtCost(cost, goFirst);
            prob = 1 - C(30-count, cardsDrawed)/C(30, cardsDrawed);
            return prob.toFixed(2);
        }

        /**
         * @name comboSuccess
         * @kind function
         *
         * @param {array} the senario which contains cards information
         * @param {number | string} the number of cards left in deck when the combo condition is reached
         *
         * @returns string - the probability
         */
        function comboSuccess() {

        }

        function cardsDrawedAtCost(cost, goFirst){
            if (goFirst) {
                return 3 + cost;
            }else {
                return 4 + cost;
            }
        }

        function parseSenario(){

        }

    }
})();
