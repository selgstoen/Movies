using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Movies.Models;

namespace Movies.Controllers
{
    public class ShowsController : ApiController
    {
        private readonly MoviesContext _db = new MoviesContext();
        //GET api/Shows
        public IEnumerable<Show> GetShows()
        {
            return _db.Shows;
        }

        public IEnumerable<Show> GetShowsByCinemaId(int id)
        {
            return _db.Shows.Where(s => s.CinemaId == id);
        }
    }
}
