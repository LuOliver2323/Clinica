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
    public class ResponsavelController : ControllerBase
    {
        private IBaseService<Responsavel> _service;

        public ResponsavelController(IBaseService<Responsavel> service)
        {
            _service = service;
        }

        [HttpPost]
        public IActionResult inserir(ResponsavelModel responsavel)
        {
            if (responsavel == null)
                return NotFound();
            else
                return Execute(() => _service.Add<ResponsavelModel, ResponsavelValidator>(responsavel));

        }

        [HttpPut]
        public IActionResult alterar(ResponsavelModel responsavel)
        {
            if (responsavel == null)
                return NotFound();
            else
                return Execute(() => _service.Update<ResponsavelModel,
                    ResponsavelValidator>(responsavel));

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
            return Execute(() => _service.GetById<ResponsavelModel>(id));
        }

        [HttpGet]
        [Authorize]
        public IActionResult selecionarTodos()
        {
            //select * from categorias
            return Execute(() => _service.Get<ResponsavelModel>());
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
