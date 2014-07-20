/*
describe('comicsService', function() {
    var comicsService, httpBackend;
    beforeEach(function() {
        module('comicsApp');
        inject(function(_comicsService_, $httpBackend) {
            comicsService = _comicsService_;
            httpBackend = $httpBackend;
        });
    });

    it('should return comics sent from server', function() {
        httpBackend.when('GET', 'https://gateway.marvel.com/v1/public/comics').respond(200, [{}, {}]);

        var comics;
        comicsService.getComics().then(function(data) {
            comics = data;
        });
        httpBackend.flush();

        expect(comics.length).toEqual(2);
    });

    it('should return an empty array when there is no comics sent from server', function() {
        httpBackend.when('GET', 'https://gateway.marvel.com/v1/public/comics').respond(204);

        var comics;
        comicsService.getComics().then(function(data) {
            comics = data;
        });
        httpBackend.flush();

        expect(comics).toBeDefined();
        expect(comics.length).toEqual(0);
    });
});*/
