(function(){

  angular
       .module('deckbuilder')
       .controller('UploadController', uploadController);

  function uploadController($scope, FIREBASE){

      var firebase = new Firebase(FIREBASE.BASE_URL);
      var self = this;
      self.selections = [1, 2, 3, 4];
      self.card = {};
      //document.getElementById('image-upload').addEventListener('change', handleFileSelect);

      function handleFileSelect(evt) {
          var file = evt.target.files[0];
          var reader = new FileReader();
          reader.onload = (function() {
              return function(e) {
                  //var filePayload = e.target.result;
                  $scope.$apply(function(){
                      self.card.imageData = e.target.result;
                      document.getElementById('preview').src = e.target.result;
                  });

              };
          })();
          reader.readAsDataURL(file);
      }

      self.save = function(){
          firebase.push(self.card, function(err){
              if(err){
                  console.log(err);
              }else{
                  console.log('success');
              }
          });
      };

      $scope.$watch(function(){
          return self.card;
      }, function(val){
          console.log(val)
      }, true);

  }
})();
