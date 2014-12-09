angular.module('techNodeApp').controller('MessageCreatorCtrl', function($rootScope,$scope, socket) {
  $scope.createMessage = function () {

    if($rootScope.me){
      var data = {
        content: $scope.newMessage,
        account: $scope.me.account
      };
      socket.emit('messages.create',data);
    }
    else{
      var err={
        account:"系统",
        content:"登陆过期，请重新登陆"
      };
      $scope.$emit('errLogin', err);
    }
    $scope.newMessage = ''
  }
});