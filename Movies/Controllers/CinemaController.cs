using System.Collections.Generic;
using System.Web.Http;
using Movies.Models;

namespace Movies.Controllers
{
    public class CinemasController : ApiController
    {
        private readonly MoviesContext db = new MoviesContext();
        //GET api/Cinemas
        public IEnumerable<Cinema> GetCinemas()
        {
            return db.Cinemas;
        }
    }
}