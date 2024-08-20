using Clinica.Application.Model;
using Clinica.Domain.Entidades;
using Clinica.Domain.Interfaces;
using Clinica.Service.validators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class ContasPagarController : ControllerBase
{
    private readonly IBaseService<ContasPagar> _service;

    public ContasPagarController(IBaseService<ContasPagar> service)
    {
        _service = service;
    }

    [HttpPost]
    public IActionResult Inserir(ContasPagarModel contasPagar)
    {
        if (contasPagar == null)
            return BadRequest("Dados inválidos");

        return Execute(() => _service.Add<ContasPagarModel, ContasPagarValidator>(contasPagar));
    }

    [HttpPut("{id}")]
    public IActionResult Alterar(int id, [FromBody] ContasPagarModel contasPagar)
    {
        if (contasPagar == null || contasPagar.id != id)
            return BadRequest("Dados inválidos ou ID inconsistente");

        return Execute(() => _service.Update<ContasPagarModel, ContasPagarValidator>(contasPagar));
    }

    [HttpPut("Inativar/{id}")]
    public IActionResult Inativar(int id)
    {
        if (id == 0)
            return NotFound();

        var conta = _service.GetById<ContasPagar>(id);
        if (conta == null)
            return NotFound();

        if (conta.Status == 0)
            return BadRequest("A conta já está inativa.");

        conta.Status = 0; // Inativo
        return Execute(() => _service.Update<ContasPagar, ContasPagarValidator>(conta));
    }

    [HttpDelete("{id}")]
    public IActionResult Excluir(int id)
    {
        if (id == 0)
            return NotFound();

        return Execute(() =>
        {
            _service.Delete(id);
            return true;
        });
    }

    [HttpGet("{id}")]
    public IActionResult SelecionarID(int id)
    {
        if (id == 0)
            return NotFound();

        return Execute(() => _service.GetById<ContasPagarModel>(id));
    }

    [HttpGet]
    [Authorize]
    public IActionResult SelecionarTodos()
    {
        return Execute(() => _service.Get<ContasPagarModel>());
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
