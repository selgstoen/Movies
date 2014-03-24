using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Movies.Models;

namespace Movies.Controllers
{
    public class MoviesController : ApiController
    {
        private readonly MoviesContext db = new MoviesContext();

        

        // GET api/Movies
        public IEnumerable<Movie> GetMovies()
        {
            return db.Movies;
        }

        // GET api/Movies/5
        [ResponseType(typeof(Movie))]
        public async Task<IHttpActionResult> GetMovie(int id)
        {
            //Movie movie = await db.Movies.FindAsync(id);
            var movie = new Movie();
            if (movie == null)
            {
                return NotFound();
            }

            return Ok(movie);
        }

        // PUT api/Movies/5
        public async Task<IHttpActionResult> PutMovie(int id, Movie movie)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != movie.Id)
            {
                return BadRequest();
            }

            db.Entry(movie).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MovieExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST api/Movies
        [ResponseType(typeof(Movie))]
        public async Task<IHttpActionResult> PostMovie(Movie movie)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Movies.Add(movie);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = movie.Id }, movie);
        }

        // DELETE api/Movies/5
        [ResponseType(typeof(Movie))]
        public async Task<IHttpActionResult> DeleteMovie(int id)
        {
            //Movie movie = await db.Movies.FindAsync(id);
            var movie = new Movie();
            if (movie == null)
            {
                return NotFound();
            }

            db.Movies.Remove(movie);
            await db.SaveChangesAsync();

            return Ok(movie);
        }

        public IEnumerable<Movie> GetMoviesByGenre(string genre)
        {
            return db.Movies.Where(m =>
              m.Genre.Equals(genre, StringComparison.OrdinalIgnoreCase));
        }
        

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MovieExists(int id)
        {
            return db.Movies.Count(e => e.Id == id) > 0;
        }
    }
}