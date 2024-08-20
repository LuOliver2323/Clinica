using Clinica.Application.Model;
using Clinica.Domain.Entidades;
using Clinica.Domain.Interfaces;
using Clinica.Service.validators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Clinica.Application.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class EspecialidadeController : ControllerBase
    {
        private IBaseService<Especialidade> _service;

        public EspecialidadeController(IBaseService<Especialidade> service)
        {
            _service = service;
        }

        [HttpPost]
        public IActionResult inserir(EspecialidadeModel especialidade)
        {
            if (especialidade == null)
                return NotFound();
            else
                return Execute(() => _service.Add<EspecialidadeModel, EspecialidadeValidator>(especialidade));
        }

        [HttpPut("{id}")]
        public IActionResult Alterar(int id, EspecialidadeModel especialidade)
        {
            if (especialidade == null || id != especialidade.id)
                return BadRequest();
            else
                return Execute(() => _service.Update<EspecialidadeModel, EspecialidadeValidator>(especialidade));
        }

        [HttpDelete("{id}")]
        public IActionResult excluir(int id)
        {
            if (id == 0)
                return NotFound();
            return Execute(() => { _service.Delete(id); return true; });
        }

        [HttpGet("{id}")]
        public IActionResult selecionarID(int id)
        {
            if (id == 0)
                return NotFound();
            return Execute(() => _service.GetById<EspecialidadeModel>(id));
        }

        [HttpGet]
        [Authorize]
        public IActionResult selecionarTodos()
        {
            //select * from categorias
            return Execute(() => _service.Get<EspecialidadeModel>());
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
