app.controller('teamsController', ['$scope', '$location', 'teamsService', function($scope, $location, teamsService) {
    $scope.openTeam = function(id) {
        $location.path('/team/'+id);
    };

    $scope.search = function() {
        $location.search('keywords', $scope.keywords);
        teamsService.search($scope.keywords).then(function(teams) {
            $scope.teams = teams;
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