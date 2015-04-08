(function() {

    angular
        .module('deckbuilder')
        .controller('PlaygroundController', playgroundController);

    function playgroundController($firebaseArray, FIREBASE, $scope) {

        var self = this;

        var currentPage = 0;
        var perPage = 8;
        var firebase = new Firebase(FIREBASE.BASE_URL);
        self.cards = [];            // all cards for  a tab
        self.currentCards = [];     // cards in current page
        self.selectedCards = [];    // selected cards in left column

        //function decorate(array) {
        //
        //    var selectedIDs = self.selectedCards.cards.map(function (card) {
        //        return card.$id;
        //    });
        //    console.log(selectedIDs);
        //
        //    array.forEach(function (item) {
        //        if (!_.contains(selectedIDs, item.$id)) {
        //            item.available = 2;
        //        } else {
        //            //var selectedCount = getCount(self.selectedCards, item.$id);
        //            self.selectedCards.cards.forEach(function (card) {
        //                if (item.$id === card.$id) {
        //                    item.available = 2 - card.selectedCount;
        //                }
        //            });
        //        }
        //    });
        //}

        function reloadCards(index) {
            if (!_.isUndefined(index)) {
                var className = self.tabs[index].title;
                self.cards = $firebaseArray(firebase.orderByChild('class').equalTo(className))
                self.cards.$loaded().then(function() {
                    //console.log('cards loaded', self.cards);
                    //decorate(self.cards);
                    sync();
                    self.currentCards = self.cards.slice(0, perPage);
                }, function(err) {
                    console.log(err);
                });
            }
        }

        function sync() {
            //debugger;
            for (var i = 0; i < self.cards.length; i++) {
                if (self.selectedCards.length > 0) {
                    for (var j = 0; j < self.selectedCards.length; j++) {
                        if (self.cards[i].$id === self.selectedCards[j].$id) {
                            self.cards[i].available = 2 - self.selectedCards[j].selectedCount;
                        } else {
                            self.cards[i].available = 2;
                        }
                    }
                } else {
                    self.cards[i].available = 2;
                }
            }
        }

        self.selectCard = function(card) {
            //debugger;
            if (card.available < 1) {
                return;
            }
            if (self.selectedCards.length > 0) {
                for (var j = 0; j < self.selectedCards.length; j++) {
                    if (card.$id === self.selectedCards[j].$id) {
                        card.available--;
                        self.selectedCards[j].selectedCount = 2;
                        break;
                    } else {
                        self.selectedCards.push(card);
                        card.available--;
                        card.selectedCount = 1;
                    }
                }
            } else {
                self.selectedCards.push(card);
                card.available--;
                card.selectedCount = 1;
            }

        };


        self.unselectCard = function(card) {
            //debugger;

            if (card.selectedCount === 2) {
                card.selectedCount = 1;
            } else {
                card.selectedCount = 0;
                self.selectedCards.splice(this.selectedCards.indexOf(card), 1);
            }
            for (var i = 0; i < self.cards.length; i++) {
                if (card.$id === self.cards[i].$id) {
                    self.cards[i].available++;
                }
            }
        };
        //self.selectCard = function (card) {
        //    if (card.available > 0) {
        //        self.selectedCards.add(card);
        //        card.available--;
        //    }
        //};

        //self.selectedCards = {
        //    cards: [],
        //    add: function (card) {
        //        if (_.contains(this.cards, card)) {
        //            card.selectedCount = 2;
        //        } else {
        //            card.selectedCount = 1;
        //            this.cards.push(card);
        //        }
        //    },
        //    remove: function (card) {
        //        if (card.selectedCount === 2) {
        //            card.selectedCount--;
        //        } else {
        //            this.cards.splice(this.cards.indexOf(card), 1);
        //        }
        //        card.available++;
        //    }
        //};

        self.tabs = [{
            title: 'Warrior',
            content: '<div>Tab1 content</div>'
        },
            {
                title: 'Mage',
                content: '<div>Tab2 content</div>'
            },
            {
                title: 'Shamman',
                content: '<div>Tab3 content</div>'
            }
        ];

        self.nextPage = function() {
            if (self.cards.length >= currentPage * perPage + perPage) {
                currentPage++;
            }
        };

        self.previousPage = function() {
            if (currentPage > 0) {
                currentPage--;
            }

        };

        $scope.$watch(function() {
            return currentPage;
        }, function(newVal) {
            var end = (self.cards.length > newVal * perPage + perPage) ? newVal * perPage + perPage : self.cards.length;
            self.currentCards = self.cards.slice(newVal * perPage, end);
        });

        $scope.$watch(function() {
            return self.selectedIndex;
        }, function(newIndex) {
            reloadCards(newIndex);
        });

        self.dataOperations = function() {

            // dupe cards

            //self.cards.forEach(function(card){
            //  delete card['$id'];
            //  delete card['$priority'];
            //  delete card['$$hashKey'];
            //  firebase.push(card, function(err){
            //    if(err){
            //      console.log(err);
            //    }else{
            //      console.log('dupe success');
            //    }
            //  });
            //});

            // randomize card images

            // code to dupe cards
            //self.cards.forEach(function(card, index){
            //  var dice = Math.random();
            //
            //  console.log(dice);
            //  console.dir(card);
            //  if (dice > 0.5 && dice < 0.7){
            //    card.imageSrc = 'http://media-hearth.cursecdn.com/avatars/147/993/417.png';
            //    self.cards.$save(index);
            //  }
            //
            //  if (dice > 0.7){
            //    card.imageSrc = 'http://media-hearth.cursecdn.com/avatars/148/382/420.png';
            //    self.cards.$save(index);
            //  }
            //
            //});

        };

        // expression to be evaluated when a tab is selected
        self.onTabSelected = function() {
            console.log('tab selected');
        }

    }
})();
