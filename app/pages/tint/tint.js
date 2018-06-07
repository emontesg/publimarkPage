angular.module('publimark.tint', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/tint/:id', {
            templateUrl: 'pages/tint/tint.html',
            controller: 'TintController'
        });
    }])

    .controller('TintController', ['$scope','$http','contentful','$routeParams',function($scope,$http,contentful,$routeParams) {
      getNoticiaById($routeParams.id);
      var imageId;
      $scope.conId = $routeParams.id;
      $scope.tendencias = [];
      $scope.temp = [];
      getNoticia();

        function getNoticiaById(id) {
          var not = "content_type=tendencias&limit=1&sys.id="+id;
            contentful.entries(not).then(function (noti) {
              $scope.temp = noti.data.items;
              formatData();
              $scope.noticia =  $scope.temp[0].fields;
              console.log($scope.noticia);
            });
        }
        function getNoticia(){

          var knocks = "content_type=tendencias&limit=1&order=-sys.createdAt";

          contentful.entries(knocks).then(function (entry) {
            $scope.tendencias = entry.data.items;
          });
        }


        function formatData() {
          for (var i = 0; i < $scope.temp.length;i++){
              var fecha = new Date($scope.temp[i].sys.createdAt);
              $scope.temp[i].fields.fecha = fecha.getDate()+"/"+fecha.getMonth()+"/"+fecha.getFullYear();
          }

        }

    }]);
