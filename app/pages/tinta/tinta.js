/**
 * Created by jimmivila on 11/1/17.
 */


angular.module('publimark.tinta', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/tinta', {
            templateUrl: 'pages/tinta/tinta.html',
            controller: 'TintaController'
        });
    }])

    .controller('TintaController', ['$scope','$http','contentful',function($scope,$http,contentful) {
      $scope.tendenciasSlide = [];
      $scope.tendenciaLoaded;
      $scope.tendencias = [];
      $scope.categoria = "Tendencias";
      $scope.slickTintaConfig = {
        slidesToShow: 3,
        responsive: [
        {
          breakpoint: 478,
          settings: {
            slidesToShow: 1,
            centerPadding: '40px',
          }
        }
       ],
      }
      getTendencias(4);
      getNoticias();
      function getTendencias(cant){

        var tendencias = "content_type=tendencias&limit="+cant+"&order=-sys.createdAt";

        contentful.entries(tendencias).then(function (entry) {

          $scope.tendenciasSlide = entry.data.items;
          formatDataTendencias();
          $scope.tendenciaLoaded = true;
          console.log($scope.tendencias);
        });
      }
      $scope.buscarNoticia = function(key) {
        if  (key.which === 13) {
                var lastNews = "content_type=tendencias&limit="+4+"&order=-sys.createdAt&fields.texto[match]="+$scope.palabra;
                contentful.entries(lastNews).then(function (entry) {
                console.log(entry);
                $scope.tendencias = entry.data.items;

              });
        }
      }


      function getNoticias(){

        var tendencias = "content_type=tendencias&limit=3&order=-sys.createdAt&fields.categoria=Tendencias";

        contentful.entries(tendencias).then(function (entry) {

          $scope.tendencias = entry.data.items;
          formatDataTendenciasPage();
          console.log($scope.tendencias);
        });
      }

      function formatDataTendencias() {

          for (var i = 0; i < $scope.tendenciasSlide.length;i++){
              var fecha = new Date($scope.tendenciasSlide[i].sys.createdAt);
              $scope.tendenciasSlide[i].fecha = fecha.getDate()+"/"+fecha.getMonth()+"/"+fecha.getFullYear();
          }
      }
      $scope.getNoticiaByCategoria = function(categoria){
        $scope.categoria = categoria;
        $('.clicked').removeClass('clicked');
        $('#'+categoria+'').toggleClass('clicked');
        var noticia = "content_type=tendencias&limit=3&order=-sys.createdAt&fields.categoria="+categoria+"";
        contentful.entries(noticia).then(function (entry) {
          $scope.tendencias = entry.data.items;
          formatDataTendenciasPage();
          console.log($scope.tendencias);
        });
      }
      function formatDataTendenciasPage() {

          for (var i = 0; i < $scope.tendencias.length;i++){
              var fecha = new Date($scope.tendencias[i].sys.createdAt);
              $scope.tendencias[i].fecha = fecha.getDate()+"/"+fecha.getMonth()+"/"+fecha.getFullYear();
          }
      }


    }]);
