(function(){

  angular
       .module('users')
       .controller('PlaygroundController', playgroundController);

  function playgroundController($firebaseArray, FIREBASE){

    var self = this;
    var firebase = new Firebase(FIREBASE.BASE_URL);
    self.cards = $firebaseArray(firebase);
    self.tabs = [{
      title: 'tab1',
      content: '<div>Tab1 content</div>'
    },
    {
      title: 'tab2',
      content: '<div>Tab2 content</div>'
    }];

    self.selectedIndex = 1;
    self.onTabSelected = function(tab){
      console.log('tab selected', tab);
    }

  }
})();
