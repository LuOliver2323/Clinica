using Clinica.Application.Model;
using Clinica.Domain.Entidades;
using Clinica.Domain.Interfaces;
using Clinica.Service.validators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Clinica.Application.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class PacienteController : ControllerBase
    {
        private readonly IBaseService<Paciente> _service;

        public PacienteController(IBaseService<Paciente> service)
        {
            _service = service;
        }

        [HttpPost]
        public IActionResult Inserir(PacienteModel paciente)
        {
            if (paciente == null)
                return NotFound();
            else
                return Execute(() => _service.Add<PacienteModel, PacienteValidator>(paciente));
        }

        [HttpPut("{id}")]
        public IActionResult Alterar(int id, [FromBody] PacienteModel paciente)
        {
            if (paciente == null || paciente.id != id)
                return BadRequest("Dados inválidos ou ID inconsistente.");
            else
                return Execute(() => _service.Update<PacienteModel, PacienteValidator>(paciente));
        }

        [HttpPut("Inativar/{id}")]
        public IActionResult Inativar(int id)
        {
            if (id == 0)
                return NotFound();

            var paciente = _service.GetById<Paciente>(id);
            if (paciente == null)
                return NotFound();

            paciente.Status = 0; // Inativo
            return Execute(() => _service.Update<Paciente, PacienteValidator>(paciente));
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
            return Execute(() => _service.GetById<PacienteModel>(id));
        }

        [HttpGet]
        [Authorize]
        public IActionResult SelecionarTodos()
        {
            return Execute(() => _service.Get<PacienteModel>());
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
                return BadRequest(ex);
            }
        }
    }
}
