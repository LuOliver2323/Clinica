using Clinica.Domain.Entidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Clinica.Infrastructure.Data.Mapping
{
    public class ProfissionalMapping : IEntityTypeConfiguration<Profissional>
    {
        public void Configure(EntityTypeBuilder<Profissional> builder)
        {
            builder.ToTable("profissional");

            builder.HasKey(p => p.id);
            builder.Property(p => p.nome).IsRequired().HasColumnType("varchar(450)").HasColumnName("nome");

            builder.Property(p => p.idEspecialidade).IsRequired().HasColumnType("int").HasColumnName("idEspecialidade");

            builder.HasOne(p => p.especialidade)
                   .WithMany(e => e.profissionais)
                   .HasForeignKey(p => p.idEspecialidade)
                   .HasConstraintName("fk_especialidade_profissional")
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
