using System;
using System.Collections.Generic;

namespace Movies.Models
{
    public class Show
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int MovieId { get; set; }
        public int CinemaId { get; set; }
        public IEnumerable<Row> Rows {get; set; }
    }
}