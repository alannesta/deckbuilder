(function () {
    angular
        .module('deckbuilder')
        .controller('ProbabilityController', probabilityController);

    function probabilityController(MathUtil) {
        var self = this;

        self.senarioOptions = [
            {description: "起手天胡系列", id: 1},
            {description: "combo达成系列", id: 2},
            {description: "准时系列", id: 3}
        ];

        self.option = {
            step1: '',
            step2: '',
            step3: ''
        };

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
         * @param {number | string} the number of cards drawed
         *
         * @returns string - the probability
         */
        function comboSuccess(senario, cardsDrawed) {
            var prob = 0;
            var comboCardsCount = parseCountFromSenario(senario);

            var cardsRequired = senario.cards.length;

            var diff = comboCardsCount - cardsRequired;

            for (var i = 0; i <= diff; i++){
                prob = prob + C(30 - comboCardsCount, cardsDrawed - (cardsRequired+i)) * cardsCombination(senario.cards, cardsRequired+i);
            }
            prob = prob/C(30, cardsDrawed);
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

        // combinations for selected cards versus actually required cards
        function cardsCombination(cards, selectedCount) {
            var combinations = 1;
            var count1 = 0;      // count for cards which only have a count of 1 ( @@ )
            var diff = selectedCount - cards.length;

            if (diff < 0) {
                throw 'Condition is not reached, not enough card selected';
            }
            cards.forEach(function(card){
               if (card.count === 1){
                   count1 ++;
               }
            });

            combinations = C(cards.length - count1, diff) * Math.pow(2, cards.length - diff - count1);
            //console.log(combinations);
            return combinations;
        }
    }
})();
