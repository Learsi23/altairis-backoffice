// Dto/HotelDto.cs
namespace Altairis.Backoffice.Api.Dto;

public class HotelDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

 
    public List<RoomTypeDto> RoomTypes { get; set; } = new();
}