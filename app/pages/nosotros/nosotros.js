/**
 * Created by jimmivila on 11/1/17.
 */


angular.module('publimark.nosotros', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/nosotros', {
            templateUrl: 'pages/nosotros/nosotros.html',
            controller: 'NosotrosController'
        });
    }])

    .controller('NosotrosController', ['$scope','$http','contentful',function($scope,$http,contentful) {

    }]);
