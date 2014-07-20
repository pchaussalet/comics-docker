app.factory('resourcesService', ['$q', 'utilsService', function($q, utilsService) {
    var MAX_IDS = 100;

    var getImages = function(resource, ids) {
        var deferred = $q.defer();

        resource.query({filter: 'id:' + ids.join('|'), field_list: 'id,image'}, function (data) {
            var results = {};
            angular.forEach(data.results, function (result) {
                results[result.id] = result.image;
            });
            deferred.resolve(results);
        });

        return deferred.promise;
    };

    return function(resource, prefix) {
        prefix = prefix || '';

        return {
            get: function(id, fields) {
                var deferred = $q.defer();

                var field_list = fields?fields.join(','):'';
                resource.get({id: prefix+id, field_list: field_list}, function(data) {
                    deferred.resolve(data.results);
                });

                return deferred.promise;
            },
            getProperty: function(id, property) {
                var deferred = $q.defer();
                this.get(id, [property]).then(function (item) {
                    deferred.resolve(item[property]);
                });
                return deferred.promise;
            },
            getImages: function(ids) {
                return getImages(resource, ids);
            },
            addImages: function(items) {
                var deferred = $q.defer();
                items = items.map(utilsService.mapIdName).sort(utilsService.nameSorter);
                var offset = 0;
                var idsGroups = [];
                while (offset < items.length) {
                    idsGroups.push(items.slice(offset, offset + MAX_IDS).map(utilsService.extractId));
                    offset += MAX_IDS;
                }
                async.each(idsGroups, function(ids, callback) {
                    getImages(resource, ids).then(function (images) {
                        angular.forEach(items, function (item) {
                            if (images.hasOwnProperty(item.id)) {
                                item.image = images[item.id];
                            }
                        });
                        callback();
                    });
                }, function (err) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(items);
                    }
                });
                return deferred.promise;
            }
        };
    };
}]);