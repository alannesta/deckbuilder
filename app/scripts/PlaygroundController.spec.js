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

        pController = $controller('PlaygroundController', {
            $scope: scope
        });
    }));

    it('should set up the tests', function(){
        console.log('tests running');
    });

    it('should be able to select card and update available properly (case: 1)', function(){
        pController.cards = [
           {$id: 1, name: 'pengpeng', class: 'Warrior', available: 2},
           {$id: 2, name: 'air', class: 'Mage', available: 1},
           {$id: 3, name: 'water', class: 'Rogue', available: 2},
           {$id: 4, name: 'fire', class: 'Warlock', available: 2}
       ];

        pController.selectedCards = [
            {$id: 2, name: 'air', class: 'Mage', selectedCount: 1}
        ];

        pController.selectCard(pController.cards[1]);

        expect(pController.cards[1].available).toEqual(0);
        expect(pController.selectedCards[0].selectedCount).toEqual(2);
    });

    it('should be able to select card and update available properly (case: 2)', function(){
        pController.cards = [
            {$id: 1, name: 'pengpeng', class: 'Warrior', available: 2},
            {$id: 2, name: 'air', class: 'Mage', available: 2},
            {$id: 3, name: 'water', class: 'Rogue', available: 2},
            {$id: 4, name: 'fire', class: 'Warlock', available: 2}
        ];
        pController.selectedCards = [];

        pController.selectCard(pController.cards[2]);

        expect(pController.cards[2].available).toEqual(1);
        expect(pController.selectedCards[0].selectedCount).toEqual(1);
        expect(pController.selectedCards[0].name).toEqual('water');
    });

    it('should be able to unselect card and update available properly (case: 1)', function(){
        pController.cards = [
            {$id: 1, name: 'pengpeng', class: 'Warrior', available: 2},
            {$id: 2, name: 'air', class: 'Mage', available: 1},
            {$id: 3, name: 'water', class: 'Rogue', available: 2},
            {$id: 4, name: 'fire', class: 'Warlock', available: 2}
        ];
        pController.selectedCards = [
            {$id: 2, name: 'air', class: 'Mage', selectedCount: 1}
        ];

        pController.unselectCard(pController.selectedCards[0]);

        expect(pController.cards[1].available).toEqual(2);
        expect(pController.selectedCards.length).toEqual(0);
    });

    it('should be able to unselect card and update available properly (case: 2)', function(){
        pController.cards = [
            {$id: 1, name: 'pengpeng', class: 'Warrior', available: 2},
            {$id: 2, name: 'air', class: 'Mage', available: 0},
            {$id: 3, name: 'water', class: 'Rogue', available: 2},
            {$id: 4, name: 'fire', class: 'Warlock', available: 2}
        ];
        pController.selectedCards = [
            {$id: 2, name: 'air', class: 'Mage', selectedCount: 2}
        ];

        pController.unselectCard(pController.selectedCards[0]);

        expect(pController.cards[1].available).toEqual(1);
        expect(pController.selectedCards[0].selectedCount).toEqual(1);
    });


});