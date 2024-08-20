using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Clinica.Domain.Entidades;

namespace Clinica.Infrastructure.Data.Mapping
{
    public class UsuarioMapping : IEntityTypeConfiguration<Usuario>
    {
        public void Configure(EntityTypeBuilder<Usuario> builder)
        {
            builder.ToTable("usuario"); //nome da table no banco

            builder.HasKey(p => p.id); //definição de chave primaria
            builder.Property(p => p.nome).IsRequired() //campo requerido
                .HasColumnType("varchar(30)")  //tipo da coluna
                .HasColumnName("nome");  //nome da coluna no bd

            builder.Property(p => p.email).IsRequired() //campo requerido
                .HasColumnType("varchar(60)")  //tipo da coluna
                .HasColumnName("email");  //nome da coluna no bd

            builder.Property(p => p.senha).IsRequired() //campo requerido
                .HasColumnType("varchar(10)")  //tipo da coluna
                .HasColumnName("senha");  //nome da coluna no bd
        }
    }
}