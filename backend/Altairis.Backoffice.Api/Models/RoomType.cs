namespace Altairis.Backoffice.Api.Models
{

    public class RoomType
    {
        public int Id { get; set; }
        public int HotelId { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Capacity { get; set; }
        public decimal BasePrice { get; set; }

        // Navegación
        public Hotel Hotel { get; set; } = null!;
        public List<Availability> Availabilities { get; set; } = [];
        public List<Booking> Bookings { get; set; } = [];
    }
}
