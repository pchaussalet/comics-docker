app.controller('teamController', ['$scope', '$location', '$routeParams', 'teamsService', function($scope, $location, $routeParams, teamsService) {
    $scope.initialize = function(id) {
        $location.search('keywords', null).replace();
        teamsService.getBase(id).then(function(team) {
            $scope.name = team.name;
            $scope.image = team.image;
            $scope.deck = team.deck;
        });
        teamsService.getCharacters(id).then(function(characters) {
            $scope.characters = characters;
        });
    };

    $scope.openCharacter = function(id) {
        $location.path('/character/'+id);
    };

    $scope.initialize($routeParams.id);
}]);