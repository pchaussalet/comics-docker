describe('charactersService', function() {
    var charactersService, httpBackend;
    beforeEach(function() {
        module('comicsApp');
        inject(function(_charactersService_, $httpBackend) {
            charactersService = _charactersService_;
            httpBackend = $httpBackend;
        });
    });

    it('should return character\'s base data sent from server', function() {
        var fakeData = {
            results: {
                id: 123,
                name: 'foo',
                deck: 'bar',
                gender: 1,
                origin: 'fake',
                birth: '1970-01-01',
                real_name: 'Mr Fake',
                publisher: 'fakePublisher',
                image: 'fakeImage',
                aliases: 'fake\ntest\ndata'
            }
        };
        httpBackend.whenJSONP('http://www.comicvine.com/api/character/4005-2268/' +
            '?api_key=723c8347ae8ab8a24557155d627d1d467dd735ae' +
            '&field_list=id,name,deck,gender,origin,birth,real_name,publisher,image,aliases' +
            '&format=jsonp' +
            '&json_callback=JSON_CALLBACK').respond(fakeData);

        var character;
        charactersService.getBase(2268).then(function(data) {
            character = data;
        });
        httpBackend.flush();

        expect(character).toBeDefined();
        expect(character.id).toEqual(123);
        expect(character.name).toEqual('foo');
        expect(character.deck).toEqual('bar');
        expect(character.gender).toEqual(1);
        expect(character.origin).toEqual('fake');
        expect(character.birth).toEqual('1970-01-01');
        expect(character.real_name).toEqual('Mr Fake');
        expect(character.publisher).toEqual('fakePublisher');
        expect(character.image).toEqual('fakeImage');
        expect(character.aliases).toEqual('fake\ntest\ndata');
    });

    it('should return character\'s powers sent from server', function() {
        var fakePowers = {
            results: {
                powers: 'fakePowers'
            }
        };
        httpBackend.whenJSONP('http://www.comicvine.com/api/character/4005-2268/' +
            '?api_key=723c8347ae8ab8a24557155d627d1d467dd735ae' +
            '&field_list=powers' +
            '&format=jsonp' +
            '&json_callback=JSON_CALLBACK').respond(fakePowers);

        var powers;
        charactersService.getPowers(2268).then(function(data) {
            powers = data;
        });
        httpBackend.flush();

        expect(powers).toBeDefined();
        expect(powers).toEqual('fakePowers');
    });

    it('should return character\'s friends sent from server', function() {
        var fakeFriends = {
            results: {
                character_friends: [
                    { id: 123, name: 'foo' },
                    { id: 456, name: 'bar' }
                ]
            }
        };
        var fakeImages = {
            results: [
                { id: 123, image: 'image123' },
                { id: 456, image: 'image456' }
            ]
        };
        httpBackend.whenJSONP('http://www.comicvine.com/api/character/4005-2268/' +
            '?api_key=723c8347ae8ab8a24557155d627d1d467dd735ae' +
            '&field_list=character_friends' +
            '&format=jsonp' +
            '&json_callback=JSON_CALLBACK').respond(fakeFriends);
        httpBackend.whenJSONP('http://www.comicvine.com/api/characters/' +
            '?api_key=723c8347ae8ab8a24557155d627d1d467dd735ae' +
            '&field_list=id,image' +
            '&filter=id:456%7C123' +
            '&format=jsonp' +
            '&json_callback=JSON_CALLBACK').respond(fakeImages);

        var friends;
        charactersService.getFriends(2268).then(function(data) {
            friends = data;
        });
        httpBackend.flush();

        expect(friends).toBeDefined();
        expect(friends.length).toEqual(2);
        var firstFriend = friends[0];
        expect(firstFriend.id).toEqual(456);
        expect(firstFriend.name).toEqual('bar');
        expect(firstFriend.image).toEqual('image456');
        var secondFriend = friends[1];
        expect(secondFriend.id).toEqual(123);
        expect(secondFriend.name).toEqual('foo');
        expect(secondFriend.image).toEqual('image123');
    });

});
