#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data
{
    public class serverContext : DbContext
    {
        public serverContext (DbContextOptions<serverContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder
                .Entity<User>(
                    eb => {
                        eb.HasNoKey();
                    });
        }

        public DbSet<server.Models.Rating> Rating { get; set; }

        public DbSet<server.Models.Message> Message { get; set; }

        public DbSet<server.Models.User> User { get; set; }
    }
}
