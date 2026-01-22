using Altairis.Backoffice.Api.Data;
using Altairis.Backoffice.Api.Dto;
using Altairis.Backoffice.Api.DTOs;
using Altairis.Backoffice.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Altairis.Backoffice.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HotelsController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public HotelsController(ApplicationDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<List<HotelDto>>> Get(
        [FromQuery] int page = 1,
        [FromQuery] int size = 10)
    {
        page = Math.Max(1, page);
        size = Math.Max(1, Math.Min(size, 50));

        var hotels = await _db.Hotels
            .Include(h => h.RoomTypes)
            .Skip((page - 1) * size)
            .Take(size)
            .ToListAsync();

        var dtos = hotels.Select(h => new HotelDto
        {
            Id = h.Id,
            Name = h.Name,
            Location = h.Location,
            Description = h.Description,
            RoomTypes = h.RoomTypes.Select(rt => new RoomTypeDto
            {
                Id = rt.Id,
                Name = rt.Name,
                Capacity = rt.Capacity,
                BasePrice = rt.BasePrice
            }).ToList()
        }).ToList();

        return dtos;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<HotelDto>> GetById(int id)
    {
        var hotel = await _db.Hotels
            .Include(h => h.RoomTypes)
            .FirstOrDefaultAsync(h => h.Id == id);

        if (hotel == null) return NotFound();

        var dto = new HotelDto
        {
            Id = hotel.Id,
            Name = hotel.Name,
            Location = hotel.Location,
            Description = hotel.Description,
            RoomTypes = hotel.RoomTypes.Select(rt => new RoomTypeDto
            {
                Id = rt.Id,
                Name = rt.Name,
                Capacity = rt.Capacity,
                BasePrice = rt.BasePrice
            }).ToList()
        };

        return dto;
    }

    [HttpPost]
    public async Task<ActionResult<HotelDto>> Create([FromBody] CreateHotelDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Name))
            return BadRequest("El nombre del hotel es obligatorio.");

        var hotel = new Hotel
        {
            Name = dto.Name,
            Location = dto.Location,
            Description = dto.Description
        };

        _db.Hotels.Add(hotel);
        await _db.SaveChangesAsync();

        return new HotelDto
        {
            Id = hotel.Id,
            Name = hotel.Name,
            Location = hotel.Location,
            Description = hotel.Description
        };
    }
}