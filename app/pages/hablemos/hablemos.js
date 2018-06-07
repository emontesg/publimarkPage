angular.module('publimark.hablemos', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/hablemos', {
            templateUrl: 'pages/hablemos/hablemos.html',
            controller: 'HablemosController'
        });
    }])

    .controller('HablemosController', ['$scope','$http','contentful',function($scope,$http,contentful) {

    }]);
