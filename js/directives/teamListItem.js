app.directive('teamListItem', ['$location', '$q', 'charactersService', function($location, $q, charactersService) {
    return {
        restrict:       'E',
        templateUrl:    'views/directives/teamListItem.html',
        scope: {
            team: '=team'
        },
        link: function($scope) {
            $scope.openCharacter = function(id) {
                $location.path('/team/'+id);
            };
        }
    };
}]);