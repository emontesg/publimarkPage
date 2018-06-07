angular.module('publimark.knockouts', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/knockouts', {
            templateUrl: 'pages/knockouts/knockouts.html',
            controller: 'knockoutsController'
        });
    }])

    .controller('knockoutsController', ['$scope','$http','contentful',function($scope,$http,contentful) {
      $scope.knockouts = [];
      getKnockouts(4);

      function getKnockouts(cant){
            var knockouts = "content_type=knockouts&limit="+cant+"&order=-sys.createdAt";
            contentful.entries(knockouts).then(function (entry) {
                console.log(entry)
                $scope.knockouts = entry.data.items;
                formatDataKnockout();
            });
        }
        function formatDataKnockout() {

            for (var i = 0; i < $scope.knockouts.length;i++){
                var fecha = new Date($scope.knockouts[i].sys.createdAt);
                $scope.knockouts[i].fecha = fecha.getDate()+"/"+fecha.getMonth()+"/"+fecha.getFullYear();
            }
        }
        $scope.getKnockoutsByCat = function(cat){
          if (cat==="") {
            getKnockouts(4);
          }else{
            var knock = "content_type=knockouts&limit=3&order=-sys.createdAt&fields.categoria="+cat+"";
            contentful.entries(knock).then(function (entry) {
              $scope.knockouts = entry.data.items;
              formatDataKnockout();
              console.log($scope.knockouts);
            });
          }

        }
    }]);
