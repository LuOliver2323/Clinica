using Clinica.Domain.Entidades;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clinica.Service.validators
{
    public class FormaPagamentoValidator : AbstractValidator<FormaPagamento>
    {
        public FormaPagamentoValidator()
        {
            RuleFor(c => c.descricao)
            .NotEmpty().WithMessage("Informe a Descrição.")
            .NotNull().WithMessage("Informe o Descrição.");

            RuleFor(c => c.tipo)
            .NotEmpty().WithMessage("Por favor, informe o Tipo de Recebimento!")
            .NotNull().WithMessage("Por favor, informe o Tipo de Recebimento!");
   
        }
    }
}
