(function(){

  angular
       .module('users')
       .controller('UploadController', uploadController);

  function uploadController($scope){
      var self = this;
      self.card = {};

      $scope.$watch(function(){
          return self.card;
      }, function(val){
          console.log(val)
      }, true);

  }
})();
