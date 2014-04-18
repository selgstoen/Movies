
var ViewModel = function () {
    var self = this;

    self.movies = ko.observableArray();
    self.cinemas = ko.observableArray();
    self.shows = ko.observableArray();
    self.error = ko.observable();
    self.genre = ko.observable();
    self.currentCinema = ko.observable();
    self.currentCinemaId = ko.observable();
    self.loadedShows = [];
    
    self.genres = ['Action', 'Drama', 'Fantasy', 'Horror', 'Romantic Comedy'];

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
        self.currentCinema(self.cinemas()[0].Name());
        self.currentCinemaId(self.cinemas()[0].ID());
    }

    function addShows(data) {
        var mapped = ko.utils.arrayMap(data, function (item) {
            return new show(item);
        });
        self.loadedShows.push(mapped);
        self.shows(mapped); 
    }

    function onError(error) {
        self.error('Error: ' + error.status + ' ' + error.statusText);
    }

    self.getByGenre = function (genre) {
        self.error(''); 
        self.genre(genre);
        app.movieservice.byGenre(genre).then(addMovies, onError);
    };
    
    self.getCinemas = function() {
        self.error('');
        app.movieservice.cinemas().then(addCinemas, onError);     
    }

    self.getShows = function (id) {
        self.error('');
        var position = self.getPostionForShows(id);
        if (position > -1) {
            self.shows(self.loadedShows[position]);
            return;
        }
        app.showservice.ByCinemaId(id).then(addShows, onError);
    };

    self.getPostionForShows = function(cinemaId) {
        if (self.loadedShows.length === 0)
            return -1;
        for (var i = 1; i < self.loadedShows.length; i++) {
            for (var j = 0; j < self.loadedShows[i].length; j++) {
                var currentId = self.loadedShows[i][j].CinemaId;
                if (currentId === cinemaId) {
                    return i;
                }
            }
            
        }
        return -1;
    }


    self.getMoviesForCinema = function (index) {
        self.currentCinema(this.Name());
        var id = this.ID();
        self.getShows(id);
    };

    self.getByGenre(self.genres[0]);
    self.getCinemas();
}

ko.applyBindings(new ViewModel());
