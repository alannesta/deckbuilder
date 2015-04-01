(function(){

  angular
       .module('users')
       .controller('UploadController', uploadController);

  function uploadController($scope){

      var firebaseRef = 'https://radiant-fire-6566.firebaseio.com/cards';

      var firebase = new Firebase(firebaseRef);

      var self = this;
      self.card = {};
      document.getElementById('image-upload').addEventListener('change', handleFileSelect);

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
          console.log('save');
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
