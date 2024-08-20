using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clinica.Domain.Entidades
{
    public class Logradouro: BaseEntity
    {
        public String cep {  get; set; }
        public String logradouro { get; set; }
        public String bairro { get; set; }
        public String numero { get; set; }
        public String uf { get; set; }
        public String municipio { get; set; }
        public String? referencia { get; set; }
    }
}
