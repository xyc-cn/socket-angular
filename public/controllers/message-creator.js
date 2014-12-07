angular.module('techNodeApp').controller('MessageCreatorCtrl', function($scope, socket) {
  $scope.createMessage = function () {
    var data = {
      content: $scope.newMessage,
      creator: $scope.me
    };
    socket.emit('messages.create',data);
    $scope.newMessage = ''
  }
})