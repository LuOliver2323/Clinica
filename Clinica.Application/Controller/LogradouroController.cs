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
    public class LogradouroController : ControllerBase
    {
        private IBaseService<Logradouro> _service;

        public LogradouroController(IBaseService<Logradouro> service)
        {
            _service = service;
        }

        [HttpPost]
        public IActionResult inserir(LogradouroModel logradouro)
        {
            if (logradouro == null)
                return NotFound();
            else
                return Execute(() => _service.Add<LogradouroModel, LogradouroValidator>(logradouro));

        }

        [HttpPut]
        public IActionResult alterar(LogradouroModel logradouro)
        {
            if (logradouro == null)
                return NotFound();
            else
                return Execute(() => _service.Update<LogradouroModel,
                    LogradouroValidator>(logradouro));

        }

        [HttpDelete("{id}")]
        public IActionResult excluir(int id)
        {
            if (id == 0)
                return NotFound();
            return Execute(() => { _service.Delete(id); return true; });

            //return new NoContentResult();

        }

        [HttpGet("{id}")]
        public IActionResult selecionarID(int id)
        {
            if (id == 0)
                return NotFound();
            return Execute(() => _service.GetById<LogradouroModel>(id));
        }

        [HttpGet]
        [Authorize]
        public IActionResult selecionarTodos()
        {
            //select * from categorias
            return Execute(() => _service.Get<LogradouroModel>());
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
