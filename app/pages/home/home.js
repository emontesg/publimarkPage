
'use strict';

angular.module('publimark.home', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'pages/home/home.html',
            controller: 'HomeController'
        });
    }])

    .controller('HomeController', ['$scope','$http','contentful',function($scope,$http,contentful) {
      $scope.knockouts = [];

      $scope.tendencias = [];
      $scope.tendenciaLoaded;
      getKnockouts(3);
      getTendencias(4);
        // getNoticiaByCategoria('1jZQTgk39gkwKaes68EaOw')
      $scope.slickHomeConfig = {
        slidesToShow: 3,
        responsive: [
        {
          breakpoint: 478,
          settings: {
            slidesToShow: 1,
            centerMode : true,
            centerPadding: '40px',
          }
        }
       ],
      }
      function getKnockouts(cant){

            var knockouts = "content_type=knockouts&limit="+cant+"&order=-sys.createdAt";

            contentful.entries(knockouts).then(function (entry) {
                console.log(entry)
                $scope.knockouts = entry.data.items;
                formatDataKnockout();
            });
        }
        function getTendencias(cant){

          var tendencias = "content_type=tendencias&limit="+cant+"&order=-sys.createdAt";

          contentful.entries(tendencias).then(function (entry) {

            $scope.tendencias = entry.data.items;
            formatDataTendencias();
            $scope.tendenciaLoaded = true;
            console.log($scope.tendencias);
          });
        }
        function formatDataTendencias() {

            for (var i = 0; i < $scope.tendencias.length;i++){
                var fecha = new Date($scope.tendencias[i].sys.createdAt);
                $scope.tendencias[i].fecha = fecha.getDate()+"/"+fecha.getMonth()+"/"+fecha.getFullYear();
            }
        }
        function formatDataKnockout() {

            for (var i = 0; i < $scope.knockouts.length;i++){
                var fecha = new Date($scope.knockouts[i].sys.createdAt);
                $scope.knockouts[i].fecha = fecha.getDate()+"/"+fecha.getMonth()+"/"+fecha.getFullYear();
            }
        }
        $scope.getClass = function(i){
          if (i = 2) {
            return "";
          }else {

          }
        }



    }])
    ;
