using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clinica.Domain.Entidades
{
    public class FormaPagamento: BaseEntity
    {
        public FormaPagamento()
        {
            this.baixacontasapagars = new HashSet<BaixaContasPagar>();
        }
        public String descricao { get; set; }
        public String tipo { get; set; }
        public String? taxa_cartao { get; set; }
        public int Status { get; set; }

        public ICollection<BaixaContasPagar> baixacontasapagars { get; set; }

    }
}
