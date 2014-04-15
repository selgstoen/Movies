﻿/// <reference path="models.js" />


var ViewModel = function () {
    var self = this;

    self.movies = ko.observableArray();
    self.cinemas = ko.observableArray();
    self.shows = ko.observableArray();
    self.error = ko.observable();
    self.genre = ko.observable();
    self.currentCinema = ko.observable();
    self.currentCinemaId = ko.observable();
    
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

    //self.getShows = function () {
    //    self.error('');
    //    app.showservice.allShows().then(addShows, onError);
    //};

    self.getShows = function (id) {
        self.error('');
        app.showservice.ByCinemaId(id).then(addShows, onError);
    };

    self.getMoviesForCinema = function (index) {
        self.currentCinema(this.Name());
        var id = this.ID();
        self.getShows(id);
    };

    self.getByGenre(self.genres[0]);
    self.getCinemas();
    //self.getShows();
}

ko.applyBindings(new ViewModel());
