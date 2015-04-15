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

        self.sync = sync;

        function reloadCards(index) {
            if (!_.isUndefined(index)) {
                var className = self.tabs[index].title;
                self.cards = $firebaseArray(firebase.orderByChild('class').equalTo(className))
                self.cards.$loaded().then(function() {
                    //console.log('cards loaded');
                    sync();
                    self.currentCards = self.cards.slice(0, perPage);
                }, function(err) {
                    console.log(err);
                });
            }
        }

        function sync() {
            for (var i = 0; i < self.cards.length; i++) {
                if (self.selectedCards.length > 0) {
                    for (var j = 0; j < self.selectedCards.length; j++) {
                        if (self.cards[i].$id === self.selectedCards[j].$id) {
                            self.cards[i].available = 2 - self.selectedCards[j].selectedCount;
                            break;
                        }
                        self.cards[i].available = 2;
                    }
                } else {
                    self.cards[i].available = 2;
                }
            }
        }

        self.selectCard = function(card) {
            if (card.available < 1) {
                return;
            }
            var len = self.selectedCards.length;
            if (len > 0) {
                for (var j = 0; j < len; j++) {
                    if (card.$id === self.selectedCards[j].$id) {
                        card.available--;
                        self.selectedCards[j].selectedCount = 2;
                        return;
                    }
                }
                //if (self.cards.indexOf(card)<0){
                //    card = findCardById(card.id, self.cards);
                //}
                //self.selectedCards.push(card);
                //card.available--;
                //card.selectedCount = 1;
            } else {
                //if (self.cards.indexOf(card)<0){
                //    card = findCardById(card.id, self.cards);
                //}
                //self.selectedCards.push(card);
                //card.available--;
                //card.selectedCount = 1;
            }
            addNewCardToSelection(card);

        };

        function findCardById(id, arr){
            arr.forEach(function(item){
               if (item.$id === id){
                   return item;
               }
            });
            return null;
        }

        function addNewCardToSelection(card){
            if (self.cards.indexOf(card)<0){
                card = findCardById(card.$id, self.cards);
            }
            self.selectedCards.push(card);
            card.available--;
            card.selectedCount = 1;
        }

        self.unselectCard = function(card) {
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

        self.tabs = [
            {
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
