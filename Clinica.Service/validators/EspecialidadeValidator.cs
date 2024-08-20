using Clinica.Domain.Entidades;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clinica.Service.validators
{
    public class EspecialidadeValidator : AbstractValidator<Especialidade>
    {
        public EspecialidadeValidator()
        {
            RuleFor(c => c.nome_especialidade)
            .NotEmpty().WithMessage("Informe o nome da Especialidade.")
            .NotNull().WithMessage("Informe o nome da Especialidade.");
        }
    }
}
