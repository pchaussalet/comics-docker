app.factory('charactersResource', ['Resource', function($resource) {
    return $resource('/character/:id/', { id:    '@id' });
}]);