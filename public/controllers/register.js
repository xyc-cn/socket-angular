angular.module('techNodeApp').controller('RegisterCtrl', function($scope, $http, $location,$timeout) {
    $scope.register = function () {
        $http({
            url: '/users/register',
            method: 'POST',
            data: {
                account: $scope.username,
                password:$scope.password
            }
        }).success(function (user) {
            $location.path('/login')
        }).error(function (data) {
            $scope.tip = data;
            $timeout(function () {
                $scope.tip="";
            },3000);
        })
    }
})