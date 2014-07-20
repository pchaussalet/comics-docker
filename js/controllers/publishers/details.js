app.controller('publisherController', ['$scope', '$location', '$routeParams', 'publishersService', 'pageFilter', function($scope, $location, $routeParams, publishersService, pageFilter) {
    $scope.initialize = function(id) {
        $location.search('keywords', null).replace();
        publishersService.getBase(id).then(function(publisher) {
            $scope.name = publisher.name;
            $scope.image = publisher.image;
            $scope.deck = publisher.deck;
        });
        publishersService.getCharacters(id).then(function(characters) {
            $scope.charactersPage = 0;
            $scope.characters = characters;
        });
        publishersService.getTeams(id).then(function(teams) {
            $scope.teamsPage = 0;
            $scope.teams = teams;
        });
    };

    $scope.isFirstCharactersPage = function() {
        return $scope.charactersPage === 0;
    };

    $scope.isLastCharactersPage = function() {
        return pageFilter($scope.characters, $scope.charactersPage+1).length === 0;
    };

    $scope.showCharactersPage = function(charactersPage) {
        $scope.charactersPage = charactersPage;
    };

    $scope.isFirstTeamsPage = function() {
        return $scope.teamsPage === 0;
    };

    $scope.isLastTeamsPage = function() {
        return pageFilter($scope.teams, $scope.teamsPage+1).length === 0;
    };

    $scope.showTeamsPage = function(teamsPage) {
        $scope.teamsPage = teamsPage;
    };

    $scope.openCharacter = function(id) {
        $location.path('/character/'+id);
    };

    $scope.openTeam = function(id) {
        $location.path('/team/'+id);
    };

    $scope.initialize($routeParams.id);
}]);