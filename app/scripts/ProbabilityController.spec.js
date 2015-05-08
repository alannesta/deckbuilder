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

    it('should return the prob of cards on time ---> Hunter lion at cost 6', function(){
        var scenario = {cards:[{count: 2}],  goFirst: true};
        expect(pController.cardOnTime(scenario, 6)).toEqual('0.52');
    });

    it('should return the prob of cards on time ---> Warrior axe at cost 2', function(){
        var scenario = {cards:[{count: 2}], mulligan: 3, goFirst: true};
        expect(pController.cardOnTime(scenario, 2)).toEqual('0.47');
    });

    it('should return the prob of combo success ---> Druid has combo at cost 9', function(){
        //var scenario = {cards:[{count: 2}, {count: 1}, {count: 1}]};
        var scenario = {cards:[{count: 2}, {count: 2}]};
        //var scenario = {cards:[{count: 2}]};       // warrior axe at cost 2
        expect(pController.comboSuccess(scenario, 9)).toEqual('0.25');
    });

    it('should return the prob of combo success ---> Druid has double Rooooar when 15 cards are drawed from the deck', function(){
        var scenario = {cards:[{count: 2, required: 2}, {count: 2}, {count: 2}]};
        //var scenario = {cards: [{count: 1}, {count: 1}, {count: 2}, {count: 2, required: 2}]};    // blue dragon ice mage combo
        expect(pController.comboSuccess(scenario, 15)).toEqual('0.12');
    });

});