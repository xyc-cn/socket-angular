angular.module('techNodeApp').controller('RoomCtrl', function($scope, $http,socket) {
  $scope.users=[];
  $scope.moreMessage = "";
  $scope.messages=[];
  $scope.$on('showLoginErr', function (evt,err) {
    $scope.messages.push(err);
  });
  $scope.getMessage = function(){
    $http({
      url: '/messages/getMessage',
      method: 'POST',
      data: {
        date: $scope.moreMessage
      }
    }).success(function (data) {
      if(data[0]!=null){
        $scope.moreMessage=data[0].createAt;
        $scope.messages = data.concat($scope.messages);
      }
    });
  };
  socket.on('messages.read', function (messages) {
    if(messages[0]!=null){
      $scope.moreMessage=messages[0].createAt;
    }
    $scope.messages = messages;
  });
  socket.on('messages.add', function (message) {
    $scope.messages.push(message)
  });
  socket.on('users.add', function (user) {
    $scope.users.push(user)
  });
  socket.on('users.remove', function (user) {
    var _userId = user._id;
    $scope.users = $scope.users.filter(function (user) {
      return user._id != _userId
    })
  });
  socket.on('init', function (messages) {
      $scope.messages = messages;
  });
  socket.on('users.init', function (users) {
    $scope.users = users;
  });
  socket.emit('init');
  socket.emit('messages.read');

});