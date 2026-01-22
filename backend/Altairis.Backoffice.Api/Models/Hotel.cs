namespace Altairis.Backoffice.Api.Models
{
    
    public class Hotel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<RoomType> RoomTypes { get; set; } = [];
    }
}
