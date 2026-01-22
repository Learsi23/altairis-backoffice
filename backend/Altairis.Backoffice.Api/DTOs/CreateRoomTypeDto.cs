namespace Altairis.Backoffice.Api.DTOs
{
    public class CreateRoomTypeDto
    {
        public int HotelId { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Capacity { get; set; }
        public decimal BasePrice { get; set; }
    }
}
