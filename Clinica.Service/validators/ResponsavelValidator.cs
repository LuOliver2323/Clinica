using Clinica.Domain.Entidades;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clinica.Service.validators
{
    public class ResponsavelValidator : AbstractValidator<Responsavel>
    {
        public ResponsavelValidator()
        {
            RuleFor(c => c.nome_responsavel)
            .NotEmpty().WithMessage("Informe o Nome do Responsavel.")
            .NotNull().WithMessage("Informe o Nome do Responsavel.");
            RuleFor(c => c.profissao_responsavel)
            .NotEmpty().WithMessage("Informe a Profissão do Responsavel.")
            .NotNull().WithMessage("Informe a Profissão do Responsavel.");
            RuleFor(c => c.cpf_responsavel)
            .NotEmpty().WithMessage("Informe o CPF do Responsavel.")
            .NotNull().WithMessage("Informe o CPF do Responsavel.");
            RuleFor(c => c.telefone_responsavel)
            .NotEmpty().WithMessage("Informe o Telefone do Responsavel.")
            .NotNull().WithMessage("Informe o Telefone do Responsavel.");

        }
    }
}
