app.directive('publisherListItem', ['$location', function($location) {
    return {
        restrict:       'E',
        templateUrl:    'views/directives/publisherListItem.html',
        scope: {
            publisher: '=publisher'
        },
        link: function($scope) {
            $scope.openPublisher = function(id) {
                $location.path('/publisher/'+id);
            };
        }
    };
}]);