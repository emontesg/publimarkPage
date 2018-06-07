/**
 * Created by jimmivila on 11/1/17.
 */


angular.module('publimark.retadores', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/retadores', {
            templateUrl: 'pages/retadores/retadores.html',
            controller: 'RetadoresController'
        });
    }])

    .controller('RetadoresController', ['$scope','$http','contentful',function($scope,$http,contentful) {
      $scope.retadores= [];

      $scope.retadoresByDep = [];
      $scope.slickRetConfig = {
        slidesToShow: 5,
        responsive: [
        {
          breakpoint: 478,
          settings: {
            slidesToShow: 2,
            centerMode : true,
            centerPadding: '20px',
          }
        }
       ],
      }

      geRetadores();

      function geRetadores(){

        var retadores = "content_type=retadores&order=-sys.createdAt";

        contentful.entries(retadores).then(function (entry) {

          $scope.retadores = entry.data.items;
          console.log($scope.retadores);
        });
      }
      $scope.getRetadoresByDep = function(dep){
        $('.retiSelec').removeClass('retiSelec');
        $('#'+dep+'').toggleClass('retiSelec');
        if (dep === "Todos") {
          geRetadores();
        }else {
          var retadores = "content_type=retadores&limit=3&order=-sys.createdAt&fields.departamento="+dep+"";
          contentful.entries(retadores).then(function (entry) {

            $scope.retadores = entry.data.items;
            console.log($scope.retadores);
          });
        }
      }

    }]);
