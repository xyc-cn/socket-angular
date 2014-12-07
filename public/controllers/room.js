angular.module('techNodeApp').controller('RoomCtrl', function($scope, socket) {
  $scope.users=[];
  socket.on('messages.read', function (messages) {
    $scope.messages = messages;
  })
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


});