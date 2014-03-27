using System.Collections.Generic;
using System.Web.Http;
using Movies.Models;

namespace Movies.Controllers
{
    public class ShowController : ApiController
    {
        private readonly MoviesContext _db = new MoviesContext();
        //GET api/Shows
        public IEnumerable<Show> GetShows()
        {
            return _db.Shows;
        }
    }
}
