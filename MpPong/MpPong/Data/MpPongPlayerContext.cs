using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// Uses our model class and the framework for the DB
using MpPong.Models;
using Microsoft.EntityFrameworkCore;

namespace MpPong.Data
{
    public class MpPongPlayerContext : DbContext
    {
        public MpPongPlayerContext(DbContextOptions<MpPongPlayerContext> options)
            : base(options)
        { }

        public DbSet<MpPongPlayer> MpPongPlayers { get; set; }

        // Prevents EF(Entity Framework) from pluralising DbSet<MpPongPlayer> to MpPongPlayers
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MpPongPlayer>().ToTable("MpPongPlayer");
        }

    }
}
