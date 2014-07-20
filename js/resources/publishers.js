app.factory('publishersResource', ['Resource', function($resource) {
    return $resource('/publisher/:id/', { id:    '@id' });
}]);