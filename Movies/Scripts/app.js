function movie(data) {
    var self = this;
    data = data || {};

    // Data from model
    self.ID = data.ID;
    self.Title = ko.observable(data.Title);
    self.Year = ko.observable(data.Year);
    self.Rating = ko.observable(data.Rating);
    self.Genre = ko.observable(data.Genre);

    // Local (client) data
    self.editing = ko.observable(false);
};

var ViewModel = function () {
    var self = this;
    // View model observables
    self.movies = ko.observableArray();
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
    // Initialize the app by getting the first genre
    self.getByGenre(self.genres[0]);
}
// Create the view model instance and pass it to Knockout
ko.applyBindings(new ViewModel());
