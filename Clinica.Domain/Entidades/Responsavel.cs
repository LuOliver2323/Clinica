using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clinica.Domain.Entidades
{
    public class Responsavel: BaseEntity
    {
        public String nome_responsavel { get; set; }
        public String profissao_responsavel { get; set; }
        public String cpf_responsavel { get; set; }
        public String telefone_responsavel { get; set; }
    }
}
