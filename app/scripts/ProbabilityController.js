(function () {
    angular
        .module('deckbuilder')
        .controller('ProbabilityController', probabilityController);

    function probabilityController(MathUtil) {
        var self = this;

        var C = MathUtil.combination;   // alias for MathUtil.combination
        self.cardOnTime = cardOnTime;
        self.comboSuccess = comboSuccess;

        /**
         * @name cardOnTime
         * @kind function
         *
         * @param {Object} the senario which contains cards information
         * @param {number} the target cost at which the card is expected
         *
         * @returns string - the probability
         */
        function cardOnTime(senario, cost) {
            var prob;
            var count = parseCountFromSenario(senario);

            var cardsDrawed = cardsDrawedAtCost(cost, senario.goFirst, senario.mulligan);
            prob = 1 - C(30 - count, cardsDrawed) / C(30, cardsDrawed);
            return prob.toFixed(2);
        }

        /**
         * @name comboSuccess
         * @kind function
         *
         * @param {Object} the senario which contains cards information
         * @param {number | string} the number of cards left in deck when the combo condition is reached
         *
         * @returns string - the probability
         */
        function comboSuccess(senario, cardsDrawed) {
            var prob;
            var comboCardsCount = parseCountFromSenario(senario);

            var cardsRequired = senario.cards.length;

            prob = (C(30 - comboCardsCount, cardsDrawed - cardsRequired) * cardsCombination(senario.cards, cardsRequired) +
            C(30 - comboCardsCount, cardsDrawed - (cardsRequired + 1)) * cardsCombination(senario.cards, cardsRequired + 1) +
            C(30 - comboCardsCount, cardsDrawed - (cardsRequired + 2)) * cardsCombination(senario.cards, cardsRequired + 2)) /
                C(30, cardsDrawed);

            return prob.toFixed(2);
        }

        function cardsDrawedAtCost(cost, goFirst, mulligan) {
            if (goFirst) {
                // if mulligan, more cards are actually drawed because you change your starting hand for it
                if (mulligan) {
                    return 3 + mulligan + cost;
                } else {
                    return 3 + cost;
                }

            } else {
                if (mulligan) {
                    return 4 + mulligan + cost;
                } else {
                    return 4 + cost;
                }
            }
        }

        function parseCountFromSenario(senario) {
            var total = 0;
            senario.cards.forEach(function (card) {
                total = total + card.count;
            });
            return total;
        }

        function cardsCombination(cards, selectedCount) {
            var combinations;
            var diff = selectedCount - cards.length;

            if (diff < 0){
                throw 'Condition is not reached, not enough card selected';
            }
            combinations = C(cards.length, diff) * Math.pow(2, cards.length-diff);
            //console.log(combinations);
            return combinations;
        }
    }
})();
