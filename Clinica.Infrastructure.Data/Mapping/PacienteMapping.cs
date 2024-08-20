using Clinica.Domain.Entidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Clinica.Infrastructure.Data.Mapping
{
    public class PacienteMapping : IEntityTypeConfiguration<Paciente>
    {
        public void Configure(EntityTypeBuilder<Paciente> builder)
        {
            builder.ToTable("paciente"); // Nome da tabela no banco

            builder.HasKey(p => p.id); // Definição de chave primária

            builder.Property(p => p.nome).IsRequired() //campo requerido
                .HasColumnType("varchar(150)")
                .HasColumnName("nome");

            builder.Property(p => p.cpf).IsRequired()
                .HasColumnType("varchar(11)")
                .HasColumnName("cpf");

            builder.Property(p => p.rg)
                .HasColumnType("varchar(9)")
                .HasColumnName("rg");

            builder.Property(p => p.anoescolar)
                .HasColumnType("varchar(50)")
                .HasColumnName("anoescolar");

            builder.Property(p => p.escola)
                .HasColumnType("varchar(100)")
                .HasColumnName("escola");

            builder.Property(p => p.cep).IsRequired()
                .HasColumnType("varchar(8)")
                .HasColumnName("cep");

            builder.Property(p => p.logradouro).IsRequired()
                .HasColumnType("varchar(255)")
                .HasColumnName("logradouro");

            builder.Property(p => p.bairro).IsRequired()
                .HasColumnType("varchar(255)")
                .HasColumnName("bairro");

            builder.Property(p => p.numero).IsRequired()
                .HasColumnType("varchar(15)")
                .HasColumnName("numero");

            builder.Property(p => p.municipio).IsRequired()
                .HasColumnType("varchar(255)")
                .HasColumnName("municipio");

            builder.Property(p => p.observacoes)
                .HasColumnType("varchar(1000)")
                .HasColumnName("observacoes");

            builder.Property(p => p.contato).IsRequired()
                .HasColumnType("varchar(11)")
                .HasColumnName("contato");

            builder.Property(p => p.nomeresponsavel).IsRequired()
                .HasColumnType("varchar(255)")
                .HasColumnName("nomeresponsavel");

            builder.Property(p => p.profissaoresponsavel)
                .HasColumnType("varchar(255)")
                .HasColumnName("profissaoresponsavel");

            builder.Property(p => p.cpfresponsavel).IsRequired()
                .HasColumnType("varchar(11)")
                .HasColumnName("cpfresponsavel");

            builder.Property(p => p.telefoneresponsavel).IsRequired()
                .HasColumnType("varchar(11)")
                .HasColumnName("telefoneresponsavel");
        }
    }
}
