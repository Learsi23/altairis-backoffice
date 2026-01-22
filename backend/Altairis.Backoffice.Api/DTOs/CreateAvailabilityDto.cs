namespace Altairis.Backoffice.Api.DTOs
{
    public class CreateAvailabilityDto
    {
        public int RoomTypeId { get; set; }
        public DateTime Date { get; set; }
        public int Stock { get; set; }
        public decimal Price { get; set; }
    }
}
