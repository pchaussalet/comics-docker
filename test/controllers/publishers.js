describe('publishersController', function() {
    describe('list', function() {
        var scope, location, controller, publishersService;

        beforeEach(function() {
            module('comicsApp');
        });

        it('should search publishers if keywords is defined', function() {
            inject(function($controller, $rootScope, $q) {
                location = {};
                location.search = function() { return {keywords: 'baz'}; };
                publishersService = {};
                publishersService.search = function(keyword) {
                    var deferred = $q.defer();
                    deferred.resolve(['foo', 'bar']);
                    return deferred.promise;
                };
                scope = $rootScope.$new();
                controller = $controller('publishersController', {
                    $scope: scope,
                    $location: location,
                    publishersService: publishersService
                });
                $rootScope.$digest();
            });

            scope.initialize();

            expect(scope.publishers).toBeDefined();
            expect(scope.publishers.length).toEqual(2);
            expect(scope.publishers).toContain('foo');
            expect(scope.publishers).toContain('bar');
        });

        it('should not search publishers if keywords is undefined', function() {
            inject(function($controller, $rootScope, $q) {
                location = {};
                location.search = function() { return {}; };
                publishersService = {};
                publishersService.search = function(keyword) {
                    var deferred = $q.defer();
                    deferred.resolve(['foo', 'bar']);
                    return deferred.promise;
                };
                scope = $rootScope.$new();
                controller = $controller('publishersController', {
                    $scope: scope,
                    $location: location,
                    publishersService: publishersService
                });
                $rootScope.$digest();
            });

            scope.initialize();

            expect(scope.publishers).not.toBeDefined();
        });
    });

    describe('details', function() {
        var scope, controller, publishersService;

        beforeEach(function() {
            module('comicsApp');
        });

        it('should load publisher data', function() {
            var fakePublisher = {
                name: 'Fake Comics',
                image: 'fakeImage',
                deck: 'The famous comics publisher'
            };
            var fakeTeams = ['foo', 'bar'];
            var fakeCharacters = ['baz', 'quux'];
            inject(function($controller, $rootScope, $location, $q) {
                publishersService = {
                    getBase: function(id) {
                        var deferred = $q.defer();
                        deferred.resolve(fakePublisher);
                        return deferred.promise;
                    },
                    getTeams: function(id) {
                        var deferred = $q.defer();
                        deferred.resolve(fakeTeams);
                        return deferred.promise;
                    },
                    getCharacters: function(id) {
                        var deferred = $q.defer();
                        deferred.resolve(fakeCharacters);
                        return deferred.promise;
                    }
                };
                scope = $rootScope.$new();
                controller = $controller('publisherController', {
                    $scope: scope,
                    $location: $location,
                    publishersService: publishersService
                });
                $rootScope.$digest();
            });

            scope.initialize(123);

            expect(scope.name).toEqual('Fake Comics');
            expect(scope.image).toEqual('fakeImage');
            expect(scope.deck).toEqual('The famous comics publisher');

            expect(scope.teams).toEqual(['foo', 'bar']);
            expect(scope.characters).toEqual(['baz', 'quux']);
        });
    });
});
