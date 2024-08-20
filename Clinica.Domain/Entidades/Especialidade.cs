using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clinica.Domain.Entidades
{
    public class Especialidade: BaseEntity
    {
        public Especialidade()
        {
            this.profissionais = new HashSet<Profissional>();
        }
        public String nome_especialidade {  get; set; }
        public int Status { get; set; }

        public ICollection<Profissional> profissionais { get; set; }
    }
}
