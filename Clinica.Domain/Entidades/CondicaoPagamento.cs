using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clinica.Domain.Entidades
{
    public class CondicaoPagamento: BaseEntity
    {
        public CondicaoPagamento()
        {
            this.baixacontasapagars = new HashSet<BaixaContasPagar>();
        }
        public String nome_condicao { get; set; }
        public string? parcelas { get; set; }
        public int Status { get; set; }

        public ICollection<BaixaContasPagar> baixacontasapagars { get; set; }

    }
}
