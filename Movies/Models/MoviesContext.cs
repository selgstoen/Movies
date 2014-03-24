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

        private IList<Cinema> GetCinemas()
        {
            var cinemas = new List<Cinema>();
            var cinemaOne = new Cinema {Id = 1, Name = "Sanvika"};
            var cinemaTwo = new Cinema {Id = 2, Name = "Asker"};
            cinemas.Add(cinemaOne);
            cinemas.Add(cinemaTwo);
            return cinemas;
        }

        public IList<Movie> Movies
        {
            get
            {
                return getMovies();
            }
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
    }
}
