namespace Altairis.Backoffice.Api.DTOs
{
    public class AvailabilityDto
    {
        public int Id { get; set; }
        public int RoomTypeId { get; set; }
        public DateTime Date { get; set; }
        public int Stock { get; set; }
        public decimal Price { get; set; }
    }
}
