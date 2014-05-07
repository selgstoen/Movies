using System.Collections.Generic;

namespace Movies.Models
{
    public class Row
    {
        public Row(int id)
        {
            Id = id;
            Seats = new List<decimal>();
        }

        public int Id { get; set; }
        public List<decimal> Seats { get; set; }
    }
}