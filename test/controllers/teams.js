describe('teamsController', function() {
    describe('list', function() {
        var scope, location, controller, teamsService;

        beforeEach(function() {
            module('comicsApp');
        });

        it('should search teams if keywords is defined', function() {
            inject(function($controller, $rootScope, $q) {
                location = {};
                location.search = function() { return {keywords: 'baz'}; };
                teamsService = {};
                teamsService.search = function(keyword) {
                    var deferred = $q.defer();
                    deferred.resolve(['foo', 'bar']);
                    return deferred.promise;
                };
                scope = $rootScope.$new();
                controller = $controller('teamsController', {
                    $scope: scope,
                    $location: location,
                    teamsService: teamsService
                });
                $rootScope.$digest();
            });

            scope.initialize();

            expect(scope.teams).toBeDefined();
            expect(scope.teams.length).toEqual(2);
            expect(scope.teams).toContain('foo');
            expect(scope.teams).toContain('bar');
        });

        it('should not search teams if keywords is undefined', function() {
            inject(function($controller, $rootScope, $q) {
                location = {};
                location.search = function() { return {}; };
                teamsService = {};
                teamsService.search = function(keyword) {
                    var deferred = $q.defer();
                    deferred.resolve(['foo', 'bar']);
                    return deferred.promise;
                };
                scope = $rootScope.$new();
                controller = $controller('teamsController', {
                    $scope: scope,
                    $location: location,
                    teamsService: teamsService
                });
                $rootScope.$digest();
            });

            scope.initialize();

            expect(scope.teams).not.toBeDefined();
        });
    });

    describe('details', function() {
        var scope, controller, teamsService;

        beforeEach(function() {
            module('comicsApp');
        });

        it('should load team data', function() {
            var fakePublisher = {
                name: 'Fake Team',
                image: 'fakeImage',
                deck: 'The best super heroes team'
            };
            var fakeCharacters = ['foo', 'bar', 'baz'];
            inject(function($controller, $rootScope, $location, $q) {
                teamsService = {
                    getBase: function(id) {
                        var deferred = $q.defer();
                        deferred.resolve(fakePublisher);
                        return deferred.promise;
                    },
                    getCharacters: function(id) {
                        var deferred = $q.defer();
                        deferred.resolve(fakeCharacters);
                        return deferred.promise;
                    }
                };
                scope = $rootScope.$new();
                controller = $controller('teamController', {
                    $scope: scope,
                    $location: $location,
                    teamsService: teamsService
                });
                $rootScope.$digest();
            });

            scope.initialize(123);

            expect(scope.name).toEqual('Fake Team');
            expect(scope.image).toEqual('fakeImage');
            expect(scope.deck).toEqual('The best super heroes team');

            expect(scope.characters).toEqual(['foo', 'bar', 'baz']);
        });
    });

});
