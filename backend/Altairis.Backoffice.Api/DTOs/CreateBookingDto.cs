namespace Altairis.Backoffice.Api.DTOs
{
    public class CreateBookingDto
    {
        public int RoomTypeId { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
        public decimal TotalPrice { get; set; }

    }
}
