namespace Altairis.Backoffice.Api.Models
{
    public class Availability
    {
        public int Id { get; set; }
        public int RoomTypeId { get; set; }
        public DateTime Date { get; set; }
        public int Stock { get; set; }
        public decimal Price { get; set; }

        // Navegación
        public RoomType RoomType { get; set; } = null!;
    }
}
