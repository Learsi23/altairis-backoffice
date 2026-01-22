using Altairis.Backoffice.Api.Data;
using Altairis.Backoffice.Api.Dto;
using Altairis.Backoffice.Api.DTOs;
using Altairis.Backoffice.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Altairis.Backoffice.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AvailabilityController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public AvailabilityController(ApplicationDbContext db)
    {
        _db = db;
    }

    [HttpPost]
    public async Task<ActionResult<AvailabilityDto>> Create([FromBody] CreateAvailabilityDto dto)
    {
        var availability = new Availability
        {
            RoomTypeId = dto.RoomTypeId,
            Date = dto.Date,
            Stock = dto.Stock,
            Price = dto.Price
        };

        _db.Availabilities.Add(availability);
        await _db.SaveChangesAsync();

        return new AvailabilityDto
        {
            Id = availability.Id,
            RoomTypeId = availability.RoomTypeId,
            Date = availability.Date,
            Stock = availability.Stock,
            Price = availability.Price
        };
    }

    [HttpGet("roomtype/{roomTypeId}")]
    public async Task<ActionResult<List<AvailabilityDto>>> GetByRoomType(int roomTypeId)
    {
        var availabilities = await _db.Availabilities
            .Where(a => a.RoomTypeId == roomTypeId)
            .ToListAsync();

        var dtos = availabilities.Select(a => new AvailabilityDto
        {
            Id = a.Id,
            RoomTypeId = a.RoomTypeId,
            Date = a.Date,
            Stock = a.Stock,
            Price = a.Price
        }).ToList();

        return dtos;
    }
}