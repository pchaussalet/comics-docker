app.controller('publishersController', ['$scope', '$location', 'publishersService', function($scope, $location, publishersService) {
    $scope.openPublisher = function(id) {
        $location.path('/publisher/'+id);
    };

    $scope.search = function() {
        $location.search('keywords', $scope.keywords);
        publishersService.search($scope.keywords).then(function(publishers) {
            $scope.publishers = publishers;
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