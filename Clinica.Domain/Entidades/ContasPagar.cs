using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clinica.Domain.Entidades
{
    public class ContasPagar: BaseEntity
    {
        public ContasPagar()
        {
            this.baixacontasapagars = new HashSet<BaixaContasPagar>();
        }

        public String dataemissao { get; set; }
        public String datavencimento { get; set; }
        public String valor { get; set; }
        public String parcelas { get; set; }
        public String fornecedor { get; set; }
        public String documento { get; set; }
        public String? valordesconto { get; set; }
        public String? valorpago { get; set; }
        public String? juros { get; set; }
        public String? multas { get; set; }
        public String? observacoes { get; set; }
        public int Status {  get; set; }

        public ICollection<BaixaContasPagar> baixacontasapagars { get; set; }
    }
}
