using Altairis.Backoffice.Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Altairis.Backoffice.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public DashboardController(ApplicationDbContext db)
    {
        _db = db;
    }

    [HttpGet("summary")]
    public async Task<IActionResult> GetSummary()
    {
        var today = DateTime.UtcNow.Date;

        // Hoteles activos
        var hotelsCount = await _db.Hotels.CountAsync();

        // Reservas totales
        var totalBookings = await _db.Bookings.CountAsync();

        // Reservas de hoy
        var bookingsToday = await _db.Bookings
            .Where(b => b.CheckIn.Date == today)
            .CountAsync();

        // Últimos 7 días
        var last7Days = Enumerable.Range(0, 7)
            .Select(i => today.AddDays(-i))
            .Reverse()
            .ToList();

        var bookingsLast7Days = new List<object>();

        foreach (var day in last7Days)
        {
            var count = await _db.Bookings
                .Where(b => b.CheckIn.Date == day)
                .CountAsync();

            bookingsLast7Days.Add(new
            {
                date = day.ToString("yyyy-MM-dd"),
                count
            });
        }

        return Ok(new
        {
            hotelsActive = hotelsCount,
            totalBookings,
            bookingsToday,
            bookingsLast7Days
        });
    }
}
