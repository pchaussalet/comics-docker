app.factory('Resource', ['$resource', 'params', function($resource, params) {
    return function(url, paramDefaults) {
        angular.extend(paramDefaults, { format: 'jsonp', api_key: params.apiKey });
        var urlParts = url.split('/');
        urlParts[1] += 's';
        var listUrl = urlParts.join('/');
        return $resource(params.backend + url, paramDefaults,
            {
                query:  {
                    url:    params.backend + listUrl,
                    method: 'JSONP',
                    params: {
                        json_callback:  'JSON_CALLBACK'
                    }
                },
                get:  {
                    method: 'JSONP',
                    params: {
                        json_callback: 'JSON_CALLBACK'
                    }
                }
            }
        );
    };
}]);
