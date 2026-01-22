using Altairis.Backoffice.Api.Data;
using Altairis.Backoffice.Api.Dto;
using Altairis.Backoffice.Api.DTOs;
using Altairis.Backoffice.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Altairis.Backoffice.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookingsController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public BookingsController(ApplicationDbContext db)
    {
        _db = db;
    }

    [HttpPost]
    public async Task<ActionResult<BookingDto>> Create([FromBody] CreateBookingDto dto)
    {
       
        if (dto.CheckIn >= dto.CheckOut)
            return BadRequest("Check-out date must be later than check-in date.");

        if (string.IsNullOrWhiteSpace(dto.CustomerName))
            return BadRequest("Customer name is required.");

        if (dto.TotalPrice <= 0)
            return BadRequest("Total price must be greater than zero.");

        var booking = new Booking
        {
            RoomTypeId = dto.RoomTypeId,
            CustomerName = dto.CustomerName,
            CheckIn = DateTime.SpecifyKind(dto.CheckIn, DateTimeKind.Utc),
            CheckOut = DateTime.SpecifyKind(dto.CheckOut, DateTimeKind.Utc),
            TotalPrice = dto.TotalPrice,
            Status = "Confirmed"
        };

        _db.Bookings.Add(booking);
        await _db.SaveChangesAsync();

        return new BookingDto
        {
            Id = booking.Id,
            RoomTypeId = booking.RoomTypeId,
            CustomerName = booking.CustomerName,
            CheckIn = booking.CheckIn,
            CheckOut = booking.CheckOut,
            TotalPrice = booking.TotalPrice,
            Status = booking.Status
        };
    }

    [HttpGet]
    public async Task<ActionResult<List<BookingDto>>> GetAll()
    {
        var bookings = await _db.Bookings.ToListAsync();

        var dtos = bookings.Select(b => new BookingDto
        {
            Id = b.Id,
            RoomTypeId = b.RoomTypeId,
            CustomerName = b.CustomerName,
            CheckIn = b.CheckIn,
            CheckOut = b.CheckOut,
            TotalPrice = b.TotalPrice,
            Status = b.Status
        }).ToList();

        return dtos;
    }
}