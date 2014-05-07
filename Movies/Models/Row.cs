using System.Collections.Generic;

namespace Movies.Models
{
    public class Row
    {
        public Row(int id)
        {
            Id = id;
            Seats = new List<Seat>();
        }

        public int Id { get; set; }
        public List<Seat> Seats { get; set; }
    }
}