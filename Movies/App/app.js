/// <reference path="models.js" />


var ViewModel = function () {
    var self = this;
    // View model observables
    self.movies = ko.observableArray();
    self.cinemas = ko.observableArray();
    self.error = ko.observable();
    self.genre = ko.observable();  // Genre the user is currently browsing
    // Available genres
    self.genres = ['Action', 'Drama', 'Fantasy', 'Horror', 'Romantic Comedy'];
    // Adds a JSON array of movies to the view model
    function addMovies(data) {
        var mapped = ko.utils.arrayMap(data, function (item) {
            return new movie(item);
        });
        self.movies(mapped);
    }

    function addCinemas(data) {
        var mapped = ko.utils.arrayMap(data, function(item) {
            return new cinema(item);
        });
        self.cinemas(mapped);
    }
    // Callback for error responses from the server
    function onError(error) {
        self.error('Error: ' + error.status + ' ' + error.statusText);
    }
    // Fetches a list of movies by genre and updates the view model
    self.getByGenre = function (genre) {
        self.error(''); // Clear the error
        self.genre(genre);
        app.service.byGenre(genre).then(addMovies, onError);
    };

    self.getCinemas = function() {
        self.error('');
        app.service.cinemas().then(addCinemas, onError);
    };
    // Initialize the app by getting the first genre
    self.getByGenre(self.genres[0]);
    self.getCinemas();
}
// Create the view model instance and pass it to Knockout
ko.applyBindings(new ViewModel());
