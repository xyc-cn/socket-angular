angular.module('techNodeApp').config(function($routeProvider, $locationProvider) {
 // $locationProvider.html5Mode(true);
      $routeProvider.
      when('/login', {
        templateUrl: '/pages/login.html',
        controller: 'LoginCtrl'
      }).
      when('/dialog', {
          templateUrl: '/pages/dialog.html',
          controller: 'DialogCtrl'
      }).
     when('/register', {
              templateUrl: '/pages/register.html',
              controller: 'RegisterCtrl'
     }).
      otherwise({
        redirectTo: '/login'
      })
})
