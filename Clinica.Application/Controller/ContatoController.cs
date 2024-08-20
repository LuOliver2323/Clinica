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
    public class ContatoController : ControllerBase
    {
        private IBaseService<Contato> _service;

        public ContatoController(IBaseService<Contato> service)
        {
            _service = service;
        }

        [HttpPost]
        public IActionResult inserir(ContatoModel contato)
        {
            if (contato == null)
                return NotFound();
            else
                return Execute(() => _service.Add<ContatoModel, ContatoValidator>(contato));

        }

        [HttpPut]
        public IActionResult alterar(ContatoModel contato)
        {
            if (contato == null)
                return NotFound();
            else
                return Execute(() => _service.Update<ContatoModel,
                    ContatoValidator>(contato));

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
            return Execute(() => _service.GetById<ContatoModel>(id));
        }

        [HttpGet]
        [Authorize]
        public IActionResult selecionarTodos()
        {
            //select * from categorias
            return Execute(() => _service.Get<ContatoModel>());
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
