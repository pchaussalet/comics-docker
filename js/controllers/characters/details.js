app.controller('characterController', ['$scope', '$location', '$routeParams', 'charactersService', 'pageFilter', function($scope, $location, $routeParams, charactersService, pageFilter) {
    $scope.initialize = function(id) {
        $location.search('keywords', null).replace();
        charactersService.getBase(id).then(function(character) {
            $scope.name = character.name;
            $scope.deck = character.deck;
            $scope.image = character.image;
            $scope.gender = character.gender;
            $scope.birth = character.birth;
            $scope.origin = character.origin.name;
            $scope.publisher = character.publisher;
            $scope.realName = character.real_name;
            $scope.aliases = character.aliases?character.aliases.split('\n').join(', '):'';
        });
        charactersService.getPowers(id).then(function(powers) {
            $scope.powers = powers;
        });
        charactersService.getTeams(id).then(function(teams) {
            $scope.teams = teams;
        });
        charactersService.getFriends(id).then(function(friends) {
            $scope.friendsPage = 0;
            $scope.friends = friends;
        });
        charactersService.getEnemies(id).then(function(enemies) {
            $scope.enemiesPage = 0;
            $scope.enemies = enemies;
        });
    };

    $scope.isFirstFriendsPage = function() {
        return $scope.friendsPage === 0;
    };

    $scope.isLastFriendsPage = function() {
        return pageFilter($scope.friends, $scope.friendsPage+1).length === 0;
    };

    $scope.showFriendsPage = function(friendsPage) {
        $scope.friendsPage = friendsPage;
    };

    $scope.isFirstEnemiesPage = function() {
        return $scope.enemiesPage === 0;
    };

    $scope.isLastEnemiesPage = function() {
        return pageFilter($scope.enemies, $scope.enemiesPage+1).length === 0;
    };

    $scope.showEnemiesPage = function(enemiesPage) {
        $scope.enemiesPage = enemiesPage;
    };

    $scope.openCharacter = function(id) {
        $location.path('/character/'+id);
    };

    $scope.openTeam = function(id) {
        $location.path('/team/'+id);
    };

    $scope.initialize($routeParams.id);
}]);