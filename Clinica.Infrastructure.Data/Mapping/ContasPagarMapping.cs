using Clinica.Domain.Entidades;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clinica.Infrastructure.Data.Mapping
{
    public class ContasPagarMapping : IEntityTypeConfiguration<ContasPagar>
    {
        public void Configure(EntityTypeBuilder<ContasPagar> builder)
        {
            builder.ToTable("contaspagar"); //nome da table no banco

            builder.HasKey(p => p.id); //definição de chave primaria

            builder.Property(p => p.dataemissao).IsRequired() //campo requerido
               .HasColumnType("varchar(500)")
                .HasColumnName("dataemissao");

            builder.Property(p => p.datavencimento).IsRequired() //campo requerido
                .HasColumnType("varchar(500)")
                .HasColumnName("datavencimento");

            builder.Property(p => p.valor).IsRequired() //campo requerido
                .HasColumnType("varchar(500)")  //tipo da coluna
                .HasColumnName("valor");  //nome da coluna no bd

            builder.Property(p => p.parcelas).IsRequired() //campo requerido
                .HasColumnType("varchar(500)")  //tipo da coluna
                .HasColumnName("parcelas");  //nome da coluna no bd

            builder.Property(p => p.fornecedor).IsRequired() //campo requerido
                .HasColumnType("varchar(500)")  //tipo da coluna
                .HasColumnName("fornecedor");  //nome da coluna no bd

            builder.Property(p => p.documento).IsRequired() //campo requerido
                .HasColumnType("varchar(500)")  //tipo da coluna
                .HasColumnName("documento");  //nome da coluna no bd

            builder.Property(p => p.valordesconto).IsRequired() //campo requerido
                .HasColumnType("varchar(500)")  //tipo da coluna
                .HasColumnName("valordesconto");  //nome da coluna no bd

            builder.Property(p => p.valorpago).IsRequired() //campo requerido
                .HasColumnType("varchar(500)")  //tipo da coluna
                .HasColumnName("valorpago");  //nome da coluna no bd

            builder.Property(p => p.juros).IsRequired() //campo requerido
                .HasColumnType("varchar(500)")  //tipo da coluna
                .HasColumnName("juros");  //nome da coluna no bd

            builder.Property(p => p.multas).IsRequired() //campo requerido
                .HasColumnType("varchar(500)")  //tipo da coluna
                .HasColumnName("multas");  //nome da coluna no bd

            builder.Property(p => p.observacoes).IsRequired() //campo requerido
                .HasColumnType("varchar(350)")  //tipo da coluna
                .HasColumnName("observacoes");  //nome da coluna no bd

            //builder.HasMany(f => f.baixacontasapagars)
            //   .WithOne(c => c.contaspagar)
            //   .HasForeignKey(c => c.idContasPagar);
        }
    }
}
