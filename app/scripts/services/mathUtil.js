angular
    .module('deckbuilder')
    .service('MathUtil', mathUtil);

function mathUtil() {
    var self = this;
    self.combination = combination;
    function factorial(k) {
        var result = 1;
        while (k > 0) {
            result = result * k;
            k--;
        }
        return result;
    }

    function combination(n, k) {
        var result;
        if (n < k) {
            throw new Error('k must be smaller than n');
        }
        result = factorial(n) / (factorial(n - k) * factorial(k));
        return result;
    }
}