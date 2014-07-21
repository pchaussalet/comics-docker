app.controller('charactersController', ['$scope', '$location', 'charactersService', function($scope, $location, charactersService) {
    $scope.openCharacter = function(id) {
        $location.path('/character/'+id);
    };

    $scope.search = function() {
        $location.search('keywords', $scope.keywords);
        charactersService.search($scope.keywords).then(function(characters) {
            $scope.characters = characters;
        });
    };

    $scope.initialize = function() {
        $scope.keywords = $location.search().keywords;
        if ($scope.keywords) {
            $scope.search();
        }
    };

    $scope.initialize();
}]);