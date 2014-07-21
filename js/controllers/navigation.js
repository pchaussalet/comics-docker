app.controller('navigationController', ['$scope', '$location', function ($scope, $location) {
    $scope.isCurrentLocation = function(location, strict) {
        var isCurrent;
        if (strict) {
            isCurrent = location === $location.path();
        } else {
            isCurrent = $location.path().length >= location.length && $location.path().indexOf(location) === 0;
        }
        return isCurrent;
    };

    $scope.openSection = function(path){
        $location.search('keywords', null).replace();
        $location.path(path);
    };
}]);
