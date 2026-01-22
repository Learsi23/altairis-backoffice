// Dto/RoomTypeDto.cs
namespace Altairis.Backoffice.Api.Dto;

public class RoomTypeDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Capacity { get; set; }
    public decimal BasePrice { get; set; }
}