﻿using System;

namespace Movies.Models
{
    public class Show
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int MovieId { get; set; }
    }
}