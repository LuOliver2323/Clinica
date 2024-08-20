using Clinica.Domain.Entidades;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clinica.Service.validators
{
    public class PacienteValidator : AbstractValidator<Paciente>
    {
        public PacienteValidator()
        {
            RuleFor(c => c.nome)
            .NotEmpty().WithMessage("Por favor, informe o nome do paciente!")
            .NotNull().WithMessage("Por favor, informe o nome do paciente!");

            RuleFor(c => c.cpf)
            .NotEmpty().WithMessage("Por favor, informe o CPF!")
            .NotNull().WithMessage("Por favor, informe o CPF!");

            RuleFor(c => c.rg)
            .NotEmpty().WithMessage("Por favor, informe o RG!")
            .NotNull().WithMessage("Por favor, informe o RG!");

            RuleFor(c => c.anoescolar)
            .NotEmpty().WithMessage("Por favor, informe o Ano escolar!")
            .NotNull().WithMessage("Por favor, informe o Ano Escolar!");

            RuleFor(c => c.escola)
            .NotEmpty().WithMessage("Por favor, informe a Escola!")
            .NotNull().WithMessage("Por favor, informe a Escola!");

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

            RuleFor(c => c.municipio)
            .NotEmpty().WithMessage("Por favor, informe o Municipio!")
            .NotNull().WithMessage("Por favor, informe o Municipio!");
        }
    }
}
