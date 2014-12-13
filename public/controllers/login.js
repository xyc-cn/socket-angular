angular.module('techNodeApp').controller('LoginCtrl', function($scope, $http, $location,$timeout) {
  $scope.login = function () {
    $http({
      url: '/users/login',
      method: 'POST',
      data: {
        account: $scope.username,
        password:$scope.password
      }
    }).success(function (user) {
      $scope.$emit('login', user)
      $location.path('/dialog')
    }).error(function (data) {
      $scope.tip = data;
      $timeout(function () {
        $scope.tip="";
      },3000);
    })
  }
})