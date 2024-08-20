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
    public class FormaPagamentoController : ControllerBase
    {
        private readonly IBaseService<FormaPagamento> _service;

        public FormaPagamentoController(IBaseService<FormaPagamento> service)
        {
            _service = service;
        }

        [HttpPost]
        public IActionResult Inserir(FormaPagamentoModel formapagamento)
        {
            if (formapagamento == null)
                return BadRequest("Forma de pagamento é nula.");

            return Execute(() => _service.Add<FormaPagamentoModel, FormaPagamentoValidator>(formapagamento));
        }

        [HttpPut("{id}")]
        public IActionResult Alterar(int id, [FromBody] FormaPagamentoModel formapagamento)
        {
            if (formapagamento == null || formapagamento.id != id)
                return BadRequest("Dados inválidos.");

            return Execute(() => _service.Update<FormaPagamentoModel, FormaPagamentoValidator>(formapagamento));
        }

        [HttpDelete("{id}")]
        public IActionResult Excluir(int id)
        {
            if (id == 0)
                return BadRequest("ID inválido.");

            return Execute(() => { _service.Delete(id); return true; });
        }

        [HttpGet("{id}")]
        public IActionResult SelecionarID(int id)
        {
            if (id == 0)
                return BadRequest("ID inválido.");

            return Execute(() => _service.GetById<FormaPagamentoModel>(id));
        }

        [HttpGet]
        [Authorize]
        public IActionResult SelecionarTodos()
        {
            return Execute(() => _service.Get<FormaPagamentoModel>());
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
