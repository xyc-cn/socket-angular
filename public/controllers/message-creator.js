angular.module('techNodeApp').controller('MessageCreatorCtrl', function($rootScope,$scope, socket) {
  $scope.createMessage = function () {
    if($rootScope.me){
      var belong=""
      if($scope.me._id>$scope.client._id){
        belong = $scope.me._id+$scope.client._id;
      }
      else{
        belong = $scope.client._id+$scope.me._id;
      }
      var data = {
        account:$scope.me.account,
        content: $scope.newMessage,
        belong: belong,
        from:$scope.me._id,
        to:$scope.client._id
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