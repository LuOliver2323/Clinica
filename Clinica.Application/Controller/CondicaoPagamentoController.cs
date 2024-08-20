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
    public class CondicaoPagamentoController : ControllerBase
    {
        private readonly IBaseService<CondicaoPagamento> _service;

        public CondicaoPagamentoController(IBaseService<CondicaoPagamento> service)
        {
            _service = service;
        }

        [HttpPost]
        [Authorize]
        public IActionResult Inserir(CondicaoPagamentoModel condicaopagamento)
        {
            if (condicaopagamento == null)
                return NotFound();
            else
                return Execute(() => _service.Add<CondicaoPagamentoModel, CondicaoPagamentoValidator>(condicaopagamento));
        }

        [HttpPut("{id}")]
        public IActionResult Alterar(int id, CondicaoPagamentoModel condicaopagamento)
        {
            if (condicaopagamento == null || id != condicaopagamento.id)
                return BadRequest();
            else
                return Execute(() => _service.Update<CondicaoPagamentoModel, CondicaoPagamentoValidator>(condicaopagamento));
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
            return Execute(() => _service.GetById<CondicaoPagamentoModel>(id));
        }

        [HttpGet]
        [Authorize]
        public IActionResult SelecionarTodos()
        {
            return Execute(() => _service.Get<CondicaoPagamentoModel>());
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
