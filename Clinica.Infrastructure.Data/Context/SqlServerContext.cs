using Clinica.Domain.Entidades;
using Clinica.Infrastructure.Data.Mapping;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Clinica.Infrastructure.Data.Context
{
    public class SqlServerContext : DbContext
    {
        public SqlServerContext(DbContextOptions<SqlServerContext> options) : base(options)
        {
            this.Database.EnsureCreated();
        }

        public DbSet<Usuario> usuarios { get; set; }
        public DbSet<Paciente> paciente { get; set; }
        public DbSet<Contato> contato { get; set; }
        public DbSet<Profissional> profissional { get; set; }
        public DbSet<Especialidade> especialidade { get; set; }
        public DbSet<Logradouro> logradouro { get; set; }
        public DbSet<ContasPagar> contaspagar { get; set; }
        public DbSet<Responsavel> responsavel { get; set; }
        public DbSet<FormaPagamento> formapagamento { get; set; }
        public DbSet<CondicaoPagamento> condicaopagamento { get; set; }
        public DbSet<BaixaContasPagar> baixacontaspagar { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var stringConexao = @"Server=DESKTOP-IG3P7NO;DataBase=ProjetoClinica1;integrated security=true;TrustServerCertificate=True;";
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(stringConexao);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Usuario>(new UsuarioMapping().Configure);
            modelBuilder.Entity<Paciente>(new PacienteMapping().Configure);
            modelBuilder.Entity<Contato>(new ContatoMapping().Configure);
            modelBuilder.Entity<Profissional>(new ProfissionalMapping().Configure);
            modelBuilder.Entity<Especialidade>(new EspecialidadeMapping().Configure);
            modelBuilder.Entity<Logradouro>(new LogradouroMapping().Configure);
            modelBuilder.Entity<ContasPagar>(new ContasPagarMapping().Configure);
            modelBuilder.Entity<Responsavel>(new ResponsavelMapping().Configure);
            modelBuilder.Entity<FormaPagamento>(new FormaPagamentoMapping().Configure);
            modelBuilder.Entity<CondicaoPagamento>(new CondicaoPagamentoMapping().Configure);
            modelBuilder.Entity<BaixaContasPagar>(new BaixaContasPagarMapping().Configure);

        }
    }
}