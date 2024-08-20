using Clinica.Domain.Entidades;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clinica.Service.validators
{
    public class ContatoValidator : AbstractValidator<Contato>
    {
        public ContatoValidator()
        {
            RuleFor(c => c.contato)
            .NotEmpty().WithMessage("Informe o contato.")
            .NotNull().WithMessage("Informe o contato.");
        }
    }
}
