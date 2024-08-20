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
    public class CondicaoPagamentoMapping : IEntityTypeConfiguration<CondicaoPagamento>
    {
        public void Configure(EntityTypeBuilder<CondicaoPagamento> builder)
        {
            builder.ToTable("condicaopagamento"); //nome da table no banco

            builder.HasKey(p => p.id); //definição de chave primaria
            builder.Property(p => p.nome_condicao).IsRequired() //campo requerido
                .HasColumnType("varchar(50)")  //tipo da coluna
                .HasColumnName("condicaopagamento");  //nome da coluna no bd

            builder.HasMany(f => f.baixacontasapagars)
               .WithOne(c => c.condicaopagamento)
               .HasForeignKey(c => c.idCondicaoPagamento);
        }
    }
}
