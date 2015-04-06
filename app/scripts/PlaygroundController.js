(function(){

  angular
       .module('users')
       .controller('PlaygroundController', playgroundController);

  function playgroundController($firebaseArray, FIREBASE, $scope){

    var self = this;

    var currentPage = 0;
    var perPage = 8;
    var firebase = new Firebase(FIREBASE.BASE_URL);

    init();

    function init(){
      self.cards = $firebaseArray(firebase);
      self.cards.$loaded().then(function(){
        console.log('cards loaded');
        decorate(self.cards);
        self.currentCards = self.cards.slice(0, perPage);
      }, function(err){
        console.log(err);
      });
    }

    function decorate(array){
      array.forEach(function(item){
        item.available = 2;
      });
    }

    self.selectCard = function(card){
      if (card.available>0){
        self.selectedCards.add(card);
        card.available--;
      }
    };

    self.selectedCards = {
      cards: [],
      add: function(card){
        console.log(this.cards);
        if (_.contains(this.cards, card)){
          card.selectedCount = 2;
        }else{
          card.selectedCount = 1;
          this.cards.push(card);
        }
      },
      remove: function(card){
        if (card.selectedCount === 2){
          card.selectedCount--;
        }else{
          this.cards.splice(this.cards.indexOf(card), 1);
        }
        card.available++;
      }
    };

    self.tabs = [{
      title: 'tab1',
      content: '<div>Tab1 content</div>'
    },
    {
      title: 'tab2',
      content: '<div>Tab2 content</div>'
    }];

    self.nextPage = function(){
      if (self.cards.length >= currentPage*perPage + perPage){
        currentPage++;
      }
    };

    self.previousPage = function(){
      if (currentPage > 0){
        currentPage--;
      }

    };

    $scope.$watch(function(){
      return currentPage;
    }, function(newVal){
      var end = (self.cards.length > newVal*perPage + perPage)? newVal*perPage + perPage: self.cards.length;
      self.currentCards = self.cards.slice(newVal*perPage, end);
    });

    self.dataOperations = function(){

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

    //self.selectedIndex = 1;
    //self.onTabSelected = function(tab){
    //  console.log('tab selected', tab);
    //}

  }
})();
