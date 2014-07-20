describe('navigationController', function() {
    var scope, location, controller;


    beforeEach(function() {
        module('comicsApp');
        inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            location = {};
            controller = $controller('navigationController', {
                $scope: scope,
                $location: location
            });
        });
    });


    it('should return true if location is current location', function() {
        location.path = function() { return '/foo'; };

        var result = scope.isCurrentLocation('/foo');

        expect(result).toBeTruthy();
    });


    it('should return false if location is not current location', function() {
        location.path = function() { return '/foo'; };

        var result = scope.isCurrentLocation('/bar');

        expect(result).toBeFalsy();
    });


    it('should return true if current location starts with location and not strict', function() {
        location.path = function() { return '/foo'; };

        var result = scope.isCurrentLocation('/f');

        expect(result).toBeTruthy();
    });


    it('should return false if current location starts with location and strict', function() {
        location.path = function() { return '/foo'; };

        var result = scope.isCurrentLocation('/f', true);

        expect(result).toBeFalsy();
    });
});
