using Clinica.Domain.Entidades;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clinica.Service.validators
{
    public class BaixaContasPagarValidator : AbstractValidator<BaixaContasPagar>
    {
        public BaixaContasPagarValidator()
        {
            RuleFor(p => p.idContasPagar).NotEmpty().WithMessage("Selecione a conta");
            RuleFor(p => p.idFormaPagamento).NotEmpty().WithMessage("Selecione a forma de pagamento");
            RuleFor(p => p.idCondicaoPagamento).NotEmpty().WithMessage("Selecione a condição de pagamento");
        }
    }
}
