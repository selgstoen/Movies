

window.app.showservice = (function () {
    var baseUri = '/api/show/';
    var serviceUrls = {
        shows: function () { return baseUri; }
    }

    function ajaxRequest(type, url, data) {
        var options = {
            url: url,
            headers: {
                Accept: "application/json"
            },
            contentType: "application/json",
            cache: false,
            type: type,
            data: data ? ko.toJSON(data) : null
        };
        return $.ajax(options);
    }

    return {
        allShows: function () {
            return ajaxRequest('get', serviceUrls.shows());
        }
    };
})();
