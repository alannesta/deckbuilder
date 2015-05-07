'use strict';

describe('Playground Controller', function () {

    var $controller;
    var $rootScope;
    var $q;
    var pController;
    var scope;

    beforeEach(angular.mock.module('deckbuilder'));

    beforeEach(inject(function (_$controller_, _$rootScope_, _$q_) {
        $rootScope = _$rootScope_;
        $q = _$q_;
        $controller  = _$controller_;
        scope = $rootScope.$new();

        pController = $controller('ProbabilityController', {
            $scope: scope
        });
    }));

    it('should return the prob of cards on time: 7 fei zhun shi pengpeng', function(){
        var scenario = {cards:[{count: 2}],  goFirst: true};
        expect(pController.cardOnTime(scenario, 7)).toEqual('0.56');
    });

    it('should return the prob of cards on time: 2 fei you xiao futou', function(){
        var scenario = {cards:[{count: 2}], mulligan: 3, goFirst: true};
        expect(pController.cardOnTime(scenario, 2)).toEqual('0.31');
    });

});