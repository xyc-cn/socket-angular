angular.module('techNodeApp').controller('LoginCtrl', function($scope, $http, $location) {
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
      $location.path('/')
    }).error(function (data) {
      $scope.tip = data;
    })
  }
})