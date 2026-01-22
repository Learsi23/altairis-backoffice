using Altairis.Backoffice.Api.Data;
using Altairis.Backoffice.Api.Dto;
using Altairis.Backoffice.Api.DTOs;
using Altairis.Backoffice.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Altairis.Backoffice.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RoomTypesController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public RoomTypesController(ApplicationDbContext db)
    {
        _db = db;
    }

    [HttpPost]
    public async Task<ActionResult<RoomTypeDto>> Create([FromBody] CreateRoomTypeDto dto)
    {
        var roomType = new RoomType
        {
            HotelId = dto.HotelId,
            Name = dto.Name,
            Capacity = dto.Capacity,
            BasePrice = dto.BasePrice
        };

        _db.RoomTypes.Add(roomType);
        await _db.SaveChangesAsync();

        return new RoomTypeDto
        {
            Id = roomType.Id,
            Name = roomType.Name,
            Capacity = roomType.Capacity,
            BasePrice = roomType.BasePrice
        };
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<RoomTypeDto>> GetById(int id)
    {
        var roomType = await _db.RoomTypes.FindAsync(id);
        if (roomType == null) return NotFound();

        return new RoomTypeDto
        {
            Id = roomType.Id,
            Name = roomType.Name,
            Capacity = roomType.Capacity,
            BasePrice = roomType.BasePrice
        };
    }
}