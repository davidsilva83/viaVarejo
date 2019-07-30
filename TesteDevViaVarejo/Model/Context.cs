using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TesteDevViaVarejo.Model
{
    public class Context : DbContext
    {

     public Context(DbContextOptions<Context> options)
    : base(options)
        {
        }
        public DbSet<CadastroDeAmigos> CadastroDeAmigos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(@"Server=(localdb)\\mssqllocaldb;Database=viaVarejo;Trusted_Connection=True;MultipleActiveResultSets=true");
            }
        }
    }
}
