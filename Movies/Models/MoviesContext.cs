using System;
using System.Collections.Generic;
using System.Data.Entity;

namespace Movies.Models
{
    public class MoviesContext : DbContext
    {
        public MoviesContext() : base("name=MoviesContext")
        {
        }

        public IList<Cinema> Cinemas
        {
            get { return GetCinemas(); }
        }

        public IList<Movie> Movies
        {
            get
            {
                return getMovies();
            }
        }

        public IList<Show> Shows
        {
            get { return GetShows(); }
        }

        private IList<Show> GetShows()
        {
            var shows = new List<Show>();

            var showOne = new Show {Date = new DateTime(2014, 3, 24, 21, 0, 0), Id = 1, MovieId = 1, CinemaId = 1};
            var showTwo = new Show {Date = new DateTime(2014, 3, 24, 18, 0, 0), Id = 2, MovieId = 1, CinemaId = 2};
            var showThree = new Show { Date = new DateTime(2014, 3, 24, 23, 0, 0), Id = 3, MovieId = 1, CinemaId = 1 };

            shows.Add(showOne);
            shows.Add(showTwo);
            shows.Add(showThree);

            AddRowsToShows(shows);

            return shows;
        }

        private void AddRowsToShows(IEnumerable<Show> shows)
        {
            foreach (var show in shows)
            {
                show.Rows = GetRows();
            }
        }

        private IEnumerable<Row> GetRows()
        {
            var rows = new List<Row>();
            for (var r = 0; r < 50; r++)
            {
                var row = new Row(r);

                for (var s = 0; s < 25; s++)
                {
                    row.Seats.Add(s);
                }
                rows.Add(row);
            }
            return rows;
        }

        private IList<Movie> getMovies()
        {
            var movies = new List<Movie>();

            var movieOne = new Movie {Id = 1, Genre = "Action", Rating = "five", Title = "Action Jacson", Year = 1980};
            movies.Add(movieOne);
            var movieTwo = new Movie {Id = 2, Genre = "Action", Rating = "one", Title = "Muscle man", Year = 1988};
            movies.Add(movieTwo);
            var movieThree = new Movie { Id = 3, Genre = "Fantasy", Rating = "four", Title = "Whatha?", Year = 1988 };
            movies.Add(movieThree);

            return movies;
        }

        private IList<Cinema> GetCinemas()
        {
            var cinemas = new List<Cinema>();
            var cinemaOne = new Cinema { Id = 1, Name = "Sanvika" };
            var cinemaTwo = new Cinema { Id = 2, Name = "Asker" };
            cinemas.Add(cinemaOne);
            cinemas.Add(cinemaTwo);
            return cinemas;
        }
    }
}
