using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clinica.Domain.Entidades
{
    public class BaixaContasPagar:BaseEntity
    {
        public DateTime datapagamento { get; set; }
        public decimal? valordesconto { get; set; }
        public decimal? valormultas { get; set; }
        public decimal? valorjuros { get; set; }
        public decimal valortotal { get; set; }


        public int idContasPagar { get; set; }
        public int idFormaPagamento { get; set; }
        public int idCondicaoPagamento { get; set; }
        public ContasPagar contaspagar { get; set; }
        public FormaPagamento formapagamento { get; set; }
        public CondicaoPagamento condicaopagamento { get; set; }
    }
}
