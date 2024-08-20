using Clinica.Domain.Entidades;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clinica.Service.validators
{
    public class ContasPagarValidator : AbstractValidator<ContasPagar>
    {
        public ContasPagarValidator()
        {
            RuleFor(c => c.dataemissao)
            .NotEmpty().WithMessage("Informe a Data de Emissão")
            .NotNull().WithMessage("Informe a Data de Emissão.");
            RuleFor(c => c.datavencimento)
            .NotEmpty().WithMessage("Informe a Data de Vencimento.")
            .NotNull().WithMessage("Informe a Data de Vencimento.");
            RuleFor(c => c.valor)
            .NotEmpty().WithMessage("Informe o Valor.")
            .NotNull().WithMessage("Informe o Valor.");
            RuleFor(c => c.parcelas)
            .NotEmpty().WithMessage("Informe as Parcelas.")
            .NotNull().WithMessage("Informe as Parcelas.");
            RuleFor(c => c.fornecedor)
            .NotEmpty().WithMessage("Informe o Fornecedor.")
            .NotNull().WithMessage("Informe o Fornecedor.");
            RuleFor(c => c.documento)
            .NotEmpty().WithMessage("Informe o Documento.")
            .NotNull().WithMessage("Informe o Documento.");

        }
    }
}
