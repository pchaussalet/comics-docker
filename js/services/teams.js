app.factory('teamsService', ['$q', 'teamsResource', 'charactersService', 'utilsService', 'resourcesService', function($q, teamsResource, charactersService, utilsService, resourcesService) {
    var service = resourcesService(teamsResource, '4060-');

    return {
        search: function(keyword) {
            var deferred = $q.defer();

            teamsResource.query({filter: 'name:'+keyword}, function(data) {
                deferred.resolve(data.results);
            });

            return deferred.promise;
        },
        addImages: service.addImages,
        getImages: function(ids) {
            return service.getImages(ids);
        },
        getBase: function(id) {
            return service.get(id, ['name', 'image', 'deck', 'aliases']);
        },
        getCharacters: function(id) {
            return service.getProperty(id, 'characters').then(charactersService.addImages);
        }
    };
}]);