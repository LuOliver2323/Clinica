using Clinica.Domain.Entidades;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clinica.Service.validators
{
    public class LogradouroValidator : AbstractValidator<Logradouro>
    {
        public LogradouroValidator()
        {
            RuleFor(c => c.cep)
            .NotEmpty().WithMessage("Por favor, informe o Cep!")
            .NotNull().WithMessage("Por favor, informe o Cep!");
            RuleFor(c => c.logradouro)
            .NotEmpty().WithMessage("Por favor, informe o Logradouro!")
            .NotNull().WithMessage("Por favor, informe o Logradouro!");
            RuleFor(c => c.bairro)
            .NotEmpty().WithMessage("Por favor, informe o Bairro!")
            .NotNull().WithMessage("Por favor, informe o Bairro!");
            RuleFor(c => c.numero)
            .NotEmpty().WithMessage("Por favor, informe o Numero!")
            .NotNull().WithMessage("Por favor, informe o Numero!");
            RuleFor(c => c.uf)
            .NotEmpty().WithMessage("Por favor, informe a UF")
            .NotNull().WithMessage("Por favor, informe a UF!");
            RuleFor(c => c.municipio)
            .NotEmpty().WithMessage("Por favor, informe o Municipio!")
            .NotNull().WithMessage("Por favor, informe o Municipio!");
            RuleFor(c => c.referencia)
            .NotEmpty().WithMessage("Por favor, informe a Referencia!")
            .NotNull().WithMessage("Por favor, informe a Referencia!");
        }
    }
}
