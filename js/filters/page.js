app.filter('page', function() {
    var PAGE_SIZE = 20;
    return function(list, pageNum) {
        var result;
        if (list) {
            var start = pageNum*PAGE_SIZE;
            result = list.slice(start, start + PAGE_SIZE);
        } else {
            result = [];
        }
        return result;
    };
});