using Altairis.Backoffice.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Altairis.Backoffice.Api.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<Hotel> Hotels => Set<Hotel>();
    public DbSet<RoomType> RoomTypes => Set<RoomType>();
    public DbSet<Availability> Availabilities => Set<Availability>();
    public DbSet<Booking> Bookings => Set<Booking>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Relaciones
        modelBuilder.Entity<RoomType>()
            .HasOne(rt => rt.Hotel)
            .WithMany(h => h.RoomTypes)
            .HasForeignKey(rt => rt.HotelId);

        modelBuilder.Entity<Availability>()
            .HasOne(a => a.RoomType)
            .WithMany(rt => rt.Availabilities)
            .HasForeignKey(a => a.RoomTypeId);

        modelBuilder.Entity<Booking>()
            .HasOne(b => b.RoomType)
            .WithMany(rt => rt.Bookings)
            .HasForeignKey(b => b.RoomTypeId);

        // Índices para rendimiento
        modelBuilder.Entity<Availability>()
            .HasIndex(a => new { a.RoomTypeId, a.Date });

        modelBuilder.Entity<Booking>()
            .HasIndex(b => b.RoomTypeId);
    }
}
