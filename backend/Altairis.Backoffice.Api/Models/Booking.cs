namespace Altairis.Backoffice.Api.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public int RoomTypeId { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
        public decimal TotalPrice { get; set; }
        public string Status { get; set; } = "Confirmed";

       
        public RoomType RoomType { get; set; } = null!;
    }
}
