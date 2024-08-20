using Clinica.Domain.Entidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clinica.Infrastructure.Data.Mapping
{
    public class BaixaContasPagarMapping : IEntityTypeConfiguration<BaixaContasPagar>
    {
        public void Configure(EntityTypeBuilder<BaixaContasPagar> builder)
        {
            builder.ToTable("baixacontaspagar"); //nome da table no banco

            builder.HasKey(p => p.id); //definição de chave primaria
            builder.Property(p => p.datapagamento).IsRequired() //campo requerido
                .HasColumnName("datapagamento");  //nome da coluna no bd


            builder.HasOne(p => p.formapagamento)
                   .WithMany(e => e.baixacontasapagars)
                   .HasForeignKey(p => p.idFormaPagamento)
                   .HasConstraintName("fk_formapagamento_contaspagar")
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(p => p.condicaopagamento)
                   .WithMany(e => e.baixacontasapagars)
                   .HasForeignKey(p => p.idCondicaoPagamento)
                   .HasConstraintName("fk_condicaopagamento_contaspagar")
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(p => p.contaspagar)
                   .WithMany(e => e.baixacontasapagars)
                   .HasForeignKey(p => p.idContasPagar)
                   .HasConstraintName("fk_contas_contaspagar")
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
