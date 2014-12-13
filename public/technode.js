/**
 * Created by xieyicheng on 2014/11/28.
 */
angular.module('techNodeApp', ['ngRoute']).
    run(function ($window, $rootScope, $http, $location) {
        $http({
            url: '/users/validate',
            method: 'GET'
        }).success(function (user) {
            $rootScope.me = user;
            $location.path('/dialog')
        }).error(function (data) {
            $location.path('/login')
        });
        //登出
        $rootScope.logout = function() {
            $http({
                url: '/users/logout',
                method: 'GET'
            }).success(function (user) {
                $rootScope.me = null;
                $location.path('/login');
            })
        }
        //接收login成功的事件
        $rootScope.$on('login', function (evt, me) {
            $rootScope.me = me;
        });
        //接收登陆过期的事件
        $rootScope.$on('errLogin', function (evt, err) {
            $rootScope.$broadcast('showLoginErr',err);
        })
    });

