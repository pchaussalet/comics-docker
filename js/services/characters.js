app.factory('charactersService', ['$q', 'charactersResource', 'utilsService', 'resourcesService', function($q, charactersResource, utilsService, resourcesService) {
    var service = resourcesService(charactersResource, '4005-');

    return {
        search: function(keyword) {
            var deferred = $q.defer();

            charactersResource.query({filter: 'name:'+keyword}, function(data) {
                deferred.resolve(data.results);
            });

            return deferred.promise;
        },
        addImages: service.addImages,
        getImages: function(ids) {
            return service.getImages(ids);
        },
        getPowers:  function(id) {
            return service.getProperty(id, 'powers');
        },
        getTeams:  function(id) {
            return service.getProperty(id, 'teams');
        },
        getFriends:  function(id) {
            return service.getProperty(id, 'character_friends').then(this.addImages);
        },
        getEnemies:  function(id) {
            return service.getProperty(id, 'character_enemies').then(this.addImages);
        },
        getBase: function(id) {
            return service.get(id, ['id', 'name', 'deck', 'gender', 'origin', 'birth', 'real_name', 'publisher', 'image', 'aliases']);
        }
    };
}]);