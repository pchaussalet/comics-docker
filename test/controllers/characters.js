describe('charactersController', function() {
    describe('list', function() {
        var scope, location, controller, charactersService;

        beforeEach(function() {
            module('comicsApp');
        });

        it('should search characters if keywords is defined', function() {
            inject(function($controller, $rootScope, $q) {
                location = {};
                location.search = function() { return {keywords: 'baz'}; };
                charactersService = {};
                charactersService.search = function(keyword) {
                    var deferred = $q.defer();
                    deferred.resolve(['foo', 'bar']);
                    return deferred.promise;
                };
                scope = $rootScope.$new();
                controller = $controller('charactersController', {
                    $scope: scope,
                    $location: location,
                    charactersService: charactersService
                });
                $rootScope.$digest();
            });

            scope.initialize();

            expect(scope.characters).toBeDefined();
            expect(scope.characters.length).toEqual(2);
            expect(scope.characters).toContain('foo');
            expect(scope.characters).toContain('bar');
        });

        it('should not search characters if keywords is undefined', function() {
            inject(function($controller, $rootScope, $q) {
                location = {};
                location.search = function() { return {}; };
                charactersService = {};
                charactersService.search = function(keyword) {
                    var deferred = $q.defer();
                    deferred.resolve(['foo', 'bar']);
                    return deferred.promise;
                };
                scope = $rootScope.$new();
                controller = $controller('charactersController', {
                    $scope: scope,
                    $location: location,
                    charactersService: charactersService
                });
                $rootScope.$digest();
            });

            scope.initialize();

            expect(scope.characters).not.toBeDefined();
        });
    });

    describe('details', function() {
        var scope, controller, charactersService;

        beforeEach(function() {
            module('comicsApp');
        });

        it('should load character data', function() {
            var fakeCharacter = {
                id: 123,
                name: 'fooMan',
                deck: 'bar',
                image: 'fakeImage',
                gender: 1,
                birth: '1970-01-01',
                origin: { name: 'fake' },
                publisher: 'fakePublisher',
                real_name: 'Mr Fake',
                aliases: 'testChar\nfake character'
            };
            var fakePowers = ['faking', 'mocking', 'testing things'];
            var fakeTeams = ['testers', 'TDDists'];
            var fakeFriends = ['foo', 'bar'];
            var fakeEnemies = ['baz', 'quux'];
            inject(function($controller, $rootScope, $location, $q) {
                charactersService = {
                    getBase: function(id) {
                        var deferred = $q.defer();
                        deferred.resolve(fakeCharacter);
                        return deferred.promise;
                    },
                    getPowers: function(id) {
                        var deferred = $q.defer();
                        deferred.resolve(fakePowers);
                        return deferred.promise;
                    },
                    getTeams: function(id) {
                        var deferred = $q.defer();
                        deferred.resolve(fakeTeams);
                        return deferred.promise;
                    },
                    getFriends: function(id) {
                        var deferred = $q.defer();
                        deferred.resolve(fakeFriends);
                        return deferred.promise;
                    },
                    getEnemies: function(id) {
                        var deferred = $q.defer();
                        deferred.resolve(fakeEnemies);
                        return deferred.promise;
                    }
                };
                scope = $rootScope.$new();
                controller = $controller('characterController', {
                    $scope: scope,
                    $location: $location,
                    charactersService: charactersService
                });
                $rootScope.$digest();
            });

            scope.initialize(123);

            expect(scope.name).toEqual('fooMan');
            expect(scope.deck).toEqual('bar');
            expect(scope.image).toEqual('fakeImage');
            expect(scope.gender).toEqual(1);
            expect(scope.birth).toEqual('1970-01-01');
            expect(scope.origin).toEqual('fake');
            expect(scope.publisher).toEqual('fakePublisher');
            expect(scope.realName).toEqual('Mr Fake');
            expect(scope.aliases).toEqual('testChar, fake character');

            expect(scope.powers).toEqual(['faking', 'mocking', 'testing things']);
            expect(scope.teams).toEqual(['testers', 'TDDists']);
            expect(scope.friends).toEqual(['foo', 'bar']);
            expect(scope.enemies).toEqual(['baz', 'quux']);
        });
    });
});
