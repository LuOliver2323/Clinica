using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clinica.Domain.Entidades
{
    public class Usuario : BaseEntity
    {
        public required String nome { get; set; }
        public required String email { get; set; }
        public required String senha { get; set; }
        public int Status { get; set; }
        public String? Imagem { get; set; }
    }
}
