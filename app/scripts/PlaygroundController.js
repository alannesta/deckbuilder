(function(){

  angular
       .module('users')
       .controller('PlaygroundController', playgroundController);

  function playgroundController(){
    var self = this;
    self.tabs = [{
      title: 'tab1',
      content: '<div>Tab1 content</div>'
    },
    {
      title: 'tab2',
      content: '<div>Tab2 content</div>'
    }];

    self.cards = [{}, {}, {}, {},{}, {},{}, {}];
    self.selectedIndex = 1;
    self.onTabSelected = function(tab){
      console.log('tab selected', tab);
    }

  }
})();
