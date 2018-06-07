angular.module('publimark.knock', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/knock/:id', {
            templateUrl: 'pages/knock/knock.html',
            controller: 'KnockController'
        });
    }])

    .controller('KnockController', ['$scope','$http','contentful','$routeParams',function($scope,$http,contentful,$routeParams) {
      getKnock($routeParams.id);
      var imageId;
      $scope.conId = $routeParams.id;
      $scope.tendencias = [];
      $scope.temp = [];
      getKnockouts(2);

        function getKnock(id) {
          $('html,body').animate({
            scrollTop: $("body").offset().top},
            'slow');
          var knock = "content_type=knockouts&limit=1&sys.id="+id;
            contentful.entries(knock).then(function (knockout) {
              $scope.temp = knockout.data.items;
              formatData();
              $scope.knockout =  $scope.temp[0].fields;
              if ($scope.knockout.imagenUno == null) {
                  $scope.classUno = "no-show";
              }else {
                $scope.classUno = "";
              }
              if ($scope.knockout.imagenDos == null) {
                  $scope.classDos = "no-show";
              }else {
                $scope.classDos = "";
              }
              console.log($scope.knockout);
            });
        }
        function getKnockouts(cant){

          var knocks = "content_type=knockouts&limit="+cant+"&order=-sys.createdAt";

          contentful.entries(knocks).then(function (entry) {
            $scope.tendencias = entry.data.items;
            console.log($scope.tendencias);
          });
        }


        function formatData() {
          for (var i = 0; i < $scope.temp.length;i++){
              var fecha = new Date($scope.temp[i].sys.createdAt);
              $scope.temp[i].fields.fecha = fecha.getDate()+"/"+fecha.getMonth()+"/"+fecha.getFullYear();
          }

        }
        $scope.myClassUno = function(){
          if ($scope.knockout.imagenUno == null) {
              return "";
          }else {
            return "no-show";
          }
        }
        $scope.myClassDos = function(){

          if ($scope.knockout.imagenDos =! null) {
              return "no-show";
          }else {
            return "";
          }
        }
        $scope.shareFace = function(imagen, titulo, reto){
          console.log(reto);
          var publish = {
            url: 'https:localhost:3000/knock',
            method: 'feed',
            caption: reto,
            description: reto,
            picture: 'https:'+imagen
          }
          FB.ui(publish, callback);
          function callback(response)
          {

          }

        }
    }]);
