using Clinica.Application.Model;
using Clinica.Domain.Entidades;
using Clinica.Domain.Interfaces;
using Clinica.Service.validators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Clinica.Application.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfissionalController : ControllerBase
    {
        private readonly IBaseService<Profissional> _service;
        private readonly IBaseService<Especialidade> _especialidadeService;

        public ProfissionalController(IBaseService<Profissional> service, IBaseService<Especialidade> especialidadeService)
        {
            _service = service;
            _especialidadeService = especialidadeService;
        }

        [HttpPost]
        [Authorize]
        public IActionResult Inserir(ProfissionalModel profissional)
        {
            if (profissional == null)
                return BadRequest("Dados do profissional inválidos.");

            var especialidade = _especialidadeService.GetById<Especialidade>(profissional.idEspecialidade);
            if (especialidade == null)
                return BadRequest("Especialidade não encontrada.");

            return Execute(() => _service.Add<ProfissionalModel, ProfissionalValidator>(profissional));
        }

        [HttpPut("{id}")]
        public IActionResult Alterar(int id, ProfissionalModel profissional)
        {
            if (profissional == null || id != profissional.id)
                return BadRequest("Dados do profissional inválidos.");

            var especialidade = _especialidadeService.GetById<Especialidade>(profissional.idEspecialidade);
            if (especialidade == null)
                return BadRequest("Especialidade não encontrada.");

            return Execute(() => _service.Update<ProfissionalModel, ProfissionalValidator>(profissional));
        }

        [HttpPut("Inativar/{id}")]
        public IActionResult Inativar(int id)
        {
            if (id == 0)
                return NotFound();

            var profissional = _service.GetById<Profissional>(id);
            if (profissional == null)
                return NotFound();

            profissional.Status = 0; // Inativo
            return Execute(() => _service.Update<Profissional, ProfissionalValidator>(profissional));
        }

        [HttpDelete("{id}")]
        public IActionResult Excluir(int id)
        {
            if (id == 0)
                return NotFound();

            return Execute(() => { _service.Delete(id); return true; });
        }

        [HttpGet("{id}")]
        public IActionResult SelecionarID(int id)
        {
            if (id == 0)
                return NotFound();

            return Execute(() => _service.GetById<ProfissionalModel>(id));
        }

        [HttpGet]
        [Authorize]
        public IActionResult SelecionarTodos()
        {
            return Execute(() => _service.Get<ProfissionalModel>());
        }

        [HttpGet]
        [Route("getProfissionalEspecialidade/{idEspecialidade}")]
        public IActionResult SelecionarProfissionalEspecialidade(int idEspecialidade)
        {
            return Execute(() => _service.GetFiltro<ProfissionalModel>(
                p => p.idEspecialidade == idEspecialidade,
                p => p.OrderBy(p => p.nome),
                "especialidade", null));
        }

        [HttpGet]
        [Route("GetEspecialidades")]
        public IActionResult GetEspecialidades()
        {
            return Execute(() => _especialidadeService.Get<EspecialidadeModel>());
        }

        private IActionResult Execute(Func<object> func)
        {
            try
            {
                var result = func();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
