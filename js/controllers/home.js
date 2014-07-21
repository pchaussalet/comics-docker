app.controller('homeController', ['$scope', '$location', 'charactersService', 'publishersService', function($scope, $location, charactersService, publishersService) {
    $scope.openSection = function(path){
        $location.path(path);
    };
}]);