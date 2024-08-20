using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clinica.Domain.Entidades
{
    public class Profissional: BaseEntity
    {
        public String nome { get; set; }
        public String contato { get; set; }
        public DateTime? datanascimento { get; set; }
        public String cpf { get; set; }
        public String? rg { get; set; }
        public String numeroconselho { get; set; }
        public String cep { get; set; }
        public String logradouro { get; set; }
        public String bairro { get; set; }
        public String numero { get; set; }
        public String uf { get; set; }
        public String municipio { get; set; }
        public String? referencia { get; set; }
        public String? observacoes { get; set; }
        public int Status { get; set; }

        public int idEspecialidade { get; set; }
        public Especialidade especialidade { get; set; }

        //public int idContato { get; set; }
        //public ContatoModel contato { get; set; }
    }
}
