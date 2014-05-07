namespace Movies.Models
{
    public class Seat
    {
        public Seat(int id, int status = 0)
        {
            Id = id;
            Status = status;
        }
        public int Id { get; set; }
        public int Status { get; set; }
    }
}