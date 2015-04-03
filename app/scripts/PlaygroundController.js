(function(){

  angular
       .module('users')
       .controller('PlaygroundController', playgroundController);

  function playgroundController($firebaseArray, FIREBASE, $scope){

    var self = this;

    var currentPage = 0;
    var perPage = 8;

    self.currentCards = {};

    var firebase = new Firebase(FIREBASE.BASE_URL);
    self.cards = $firebaseArray(firebase);


    self.cards.$loaded().then(function(){
      console.log('cards loaded');
    }, function(err){
      console.log(err);
    });


    self.tabs = [{
      title: 'tab1',
      content: '<div>Tab1 content</div>'
    },
    {
      title: 'tab2',
      content: '<div>Tab2 content</div>'
    }];

    self.nextPage = function(){
      currentPage++;
      //self.cards.forEach(function(card){
      //  console.log(card);
      //  delete card['$id'];
      //  delete card['$priority'];
      //  delete card['$$hashKey'];
      //
      //  firebase.push(card, function(err){
      //    if(err){
      //      console.log(err);
      //    }else{
      //      console.log('dupe success');
      //    }
      //  });
      //});
    };

    $scope.$watch(function(){
      return currentPage;
    }, function(newVal){
      var end = (self.cards.length > newVal*perPage + perPage)? newVal*perPage + perPage: self.cards.length;
      self.currentCards = self.cards.slice(newVal*perPage, end);
      console.log(self.currentCards);
    });

    //self.selectedIndex = 1;
    //self.onTabSelected = function(tab){
    //  console.log('tab selected', tab);
    //}

  }
})();
