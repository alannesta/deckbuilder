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

    it('should return the prob of cards on time', function(){
        expect(pController.cardOnTime(2, 7, true)).toEqual('0.56');
    });
});