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
    public class FormaPagamentoMapping : IEntityTypeConfiguration<FormaPagamento>
    {
        public void Configure(EntityTypeBuilder<FormaPagamento> builder)
        {
            builder.ToTable("formapagamento"); //nome da table no banco

            builder.HasKey(p => p.id); //definição de chave primaria
            builder.Property(p => p.descricao).IsRequired() //campo requerido
                .HasColumnType("varchar(50)")  //tipo da coluna
                .HasColumnName("descricao");  //nome da coluna no bd

            builder.HasMany(f => f.baixacontasapagars)
               .WithOne(c => c.formapagamento)
               .HasForeignKey(c => c.idFormaPagamento);
        }
    }
}
