angular.module('techNodeApp').controller('DialogCtrl', function($scope, $http,socket) {
    $scope.hidden = true;
    $scope.client = "";
    $scope.users=[];
    $scope.moreMessage = "";
    $scope.messages=[];
    $scope.info= {};
    $scope.checkOpen = function(){
        return $scope.hidden;
    };
    $scope.openDialog = function (user) {
        $scope.client = user;
        $scope.hidden = false;
        $scope.info[user._id]=0;
        var belong="";
        if($scope.me._id>$scope.client._id){
            belong = $scope.me._id+$scope.client._id;
        }
        else{
            belong = $scope.client._id+$scope.me._id;
        }
        socket.emit('messages.read',belong);

    };
    $scope.$on('showLoginErr', function (evt,err) {
        $scope.messages.push(err);
    });
    $scope.getMessage = function(){
        var belong="";
        if($scope.me._id>$scope.client._id){
            belong = $scope.me._id+$scope.client._id;
        }
        else{
            belong = $scope.client._id+$scope.me._id;
        }
        $http({
            url: '/messages/getMessage',
            method: 'POST',
            data: {
                date: $scope.moreMessage,
                belong:belong
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
    socket.on('messages.add', function (message,to,from) {
        if($scope.client!=null&&$scope.client._id!=from){
            if($scope.info[from]!=null){
                $scope.info[from]++;
            }
            else{
                $scope.info[from]=1;
            }
            console.log($scope.info[from]);
        }
        if(to==$scope.me._id) {
            if(from==$scope.client._id){
            $scope.messages.push(message);
            }
        }
        if(from==$scope.me._id) {
            $scope.messages.push(message)
        }
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
        $scope.users = users.filter(function (user) {
            if(user._id != $scope.me._id){
                $scope.info[user._id]=0;
            }
            return user._id != $scope.me._id;
        });
    });
    socket.emit('init');

});