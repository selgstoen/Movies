

function movie(data) {
    var self = this;
    data = data || {};

    self.ID = data.ID;
    self.Title = ko.observable(data.Title);
    self.Year = ko.observable(data.Year);
    self.Rating = ko.observable(data.Rating);
    self.Genre = ko.observable(data.Genre);

    self.editing = ko.observable(false);
};

function cinema(data) {
    var self = this;
    data = data || {};

    self.ID = ko.observable(data.Id);
    self.Name = ko.observable(data.Name);
};

function show(data) {
    var self = this;
    data = data || {};

    self.ID = ko.observable(data.Id);
    self.Date = ko.observable(data.Date);
    self.MovieId = ko.observable(data.MovieId);
    self.CinemaId = data.CinemaId;
    self.rows = data.rows;
}

function row(data) {
    var self = this;
    data = data || {};

    self.ID = data.id;
    self.seats = data.seats;
}
