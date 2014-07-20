app.directive('characterListItem', ['$location', '$q', 'charactersService', function($location, $q, charactersService) {
    return {
        restrict:       'E',
        templateUrl:    'views/directives/characterListItem.html',
        scope: {
            character: '=character'
        },
        link: function($scope) {
            $scope.openCharacter = function(id) {
                $location.path('/character/'+id);
            };
        }
    };
}]);