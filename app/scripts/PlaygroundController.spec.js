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

    it('should be able to select card and update available properly (case: 2 single selection)', function(){
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

    it('should be able to select card and update available properly (case: 3 multiple selection)', function(){
        pController.cards = [
            {$id: 1, name: 'pengpeng', class: 'Warrior', available: 2},
            {$id: 2, name: 'air', class: 'Mage', available: 2},
            {$id: 3, name: 'water', class: 'Rogue', available: 2},
            {$id: 4, name: 'fire', class: 'Warlock', available: 2}
        ];
        pController.selectedCards = [];

        pController.selectCard(pController.cards[2]);

        // step1: select one card
        expect(pController.cards[2].available).toEqual(1);
        expect(pController.selectedCards[0].selectedCount).toEqual(1);
        expect(pController.selectedCards[0].name).toEqual('water');
        expect(pController.selectedCards.length).toEqual(1);

        // step2: select another card
        pController.selectCard(pController.cards[0]);
        expect(pController.cards[0].available).toEqual(1);
        expect(pController.selectedCards[1].selectedCount).toEqual(1);
        expect(pController.selectedCards[1].name).toEqual('pengpeng');

        // step3: select the 3rd card
        pController.selectCard(pController.cards[1]);
        expect(pController.cards[1].available).toEqual(1);
        expect(pController.selectedCards[2].selectedCount).toEqual(1);
        expect(pController.selectedCards[2].name).toEqual('air');

        expect(pController.selectedCards.length).toEqual(3);

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


    it('should sync selected cards and loaded cards', function(){
        pController.cards = [
            {$id: 1, name: 'pengpeng', class: 'Warrior'},
            {$id: 2, name: 'air', class: 'Mage'},
            {$id: 3, name: 'water', class: 'Rogue'},
            {$id: 4, name: 'fire', class: 'Warlock'}
        ];
        pController.selectedCards = [
            {$id: 2, name: 'air', class: 'Mage', selectedCount: 2},
            {$id: 4, name: 'fire', class: 'Warlock', selectedCount: 1},
            {$id: 5, name: 'alive', class: 'Warlock', selectedCount: 1}
        ];

        pController.sync();
        expect(pController.cards[1].available).toBeDefined();
        expect(pController.cards[1].available).toEqual(0);
        expect(pController.cards[3].available).toEqual(1);

    });

});