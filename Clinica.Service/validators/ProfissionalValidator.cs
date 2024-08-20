using Clinica.Domain.Entidades;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clinica.Service.validators
{
    public class ProfissionalValidator : AbstractValidator<Profissional>
    {
        public ProfissionalValidator()
        {
            RuleFor(c => c.nome)
            .NotEmpty().WithMessage("Por favor, informe o nome do profissional!")
            .NotNull().WithMessage("Por favor, informe o nome do profissional!");

            RuleFor(c => c.contato)
            .NotEmpty().WithMessage("Por favor, informe o Contato!")
            .NotNull().WithMessage("Por favor, informe o Contato!");

            RuleFor(c => c.datanascimento)
            .NotEmpty().WithMessage("Por favor, informe a Data de Nascimento!")
            .NotNull().WithMessage("Por favor, informe a Data de Nascimento!");

            RuleFor(c => c.cpf)
            .NotEmpty().WithMessage("Por favor, informe o CPF!")
            .NotNull().WithMessage("Por favor, informe o CPF!");

            RuleFor(c => c.rg)
            .NotEmpty().WithMessage("Por favor, informe o RG!")
            .NotNull().WithMessage("Por favor, informe o RG!");

            RuleFor(c => c.numeroconselho)
            .NotEmpty().WithMessage("Por favor, informe o Numero do Conselho!")
            .NotNull().WithMessage("Por favor, informe o Numero do Conselho!");

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

            RuleFor(p => p.idEspecialidade).NotEmpty().WithMessage("Informe a especialidade");
        }
    }
}
