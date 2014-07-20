app.factory('utilsService', [function() {
    return {
        mapIdName: function (x) {
            return { id: x.id, name: x.name};
        },
        nameSorter: function (a, b) {
            return a.name > b.name ? 1 : -1;
        },
        extractId: function (x) {
            return x.id;
        }
    };
}]);