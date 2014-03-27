/// <reference path="models.js" />
//function movie(data) {
//    var self = this;
//    data = data || {};

//    // Data from model
//    self.ID = data.ID;
//    self.Title = ko.observable(data.Title);
//    self.Year = ko.observable(data.Year);
//    self.Rating = ko.observable(data.Rating);
//    self.Genre = ko.observable(data.Genre);

//    // Local (client) data
//    self.editing = ko.observable(false);
//};

//function cinema(data) {
//    var self = this;
//    data = data || {};

//    self.ID = ko.observable(data.Id);
//    self.Name = ko.observable(data.Name);
//};

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
