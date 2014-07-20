app.factory('teamsResource', ['Resource', function($resource) {
    return $resource('/team/:id/', { id:    '@id' });
}]);