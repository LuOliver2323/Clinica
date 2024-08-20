using Clinica.Domain.Entidades;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clinica.Service.validators
{
    public class CondicaoPagamentoValidator : AbstractValidator<CondicaoPagamento>
    {
        public CondicaoPagamentoValidator()
        {
            RuleFor(c => c.nome_condicao)
            .NotEmpty().WithMessage("Informe o nome da condição.")
            .NotNull().WithMessage("Informe o nome da condição.");
        }
    }
}
 