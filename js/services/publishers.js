app.factory('publishersService', ['$q', 'publishersResource', 'charactersService', 'teamsService', 'utilsService', 'resourcesService', function($q, publishersResource, charactersService, teamsService, utilsService, resourcesService) {
    var HUGE_PUBLISHERS = [10, 31];

    var service = resourcesService(publishersResource);

    return {
        search: function(keyword) {
            var deferred = $q.defer();

            publishersResource.query({filter: 'name:'+keyword}, function(data) {
                deferred.resolve(data.results.filter(function(x) { return HUGE_PUBLISHERS.indexOf(x.id) == -1; }));
            });

            return deferred.promise;
        },
        getBase:    function(id) {
            return service.get(id, ['name', 'image', 'deck', 'aliases']);
        },
        getTeams:   function(id) {
            return service.getProperty(id, 'teams').then(teamsService.addImages);
        },
        getCharacters:   function(id) {
            return service.getProperty(id, 'characters').then(charactersService.addImages);
        }
    };
}]);