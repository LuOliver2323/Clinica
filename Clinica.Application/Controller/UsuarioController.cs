using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Clinica.Domain.Entidades;
using Clinica.Domain.Interfaces;
using Clinica.Application.Model;
using Clinica.Service.validators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;

namespace Clinica.Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private IConfiguration _config;
        private IBaseService<Usuario> _service;

        public UsuarioController(IConfiguration Configuration, IBaseService<Usuario> service)
        {
            _config = Configuration;
            _service = service;
        }

        private string GerarTokenJWT()
        {
            var issuer = _config["Jwt:Issuer"];
            var audience = _config["Jwt:Audience"];
            var expiry = DateTime.Now.AddMinutes(120);
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(issuer: issuer, audience: audience,
            expires: DateTime.Now.AddMinutes(120), signingCredentials: credentials);
            var tokenHandler = new JwtSecurityTokenHandler();
            var stringToken = tokenHandler.WriteToken(token);
            return stringToken;
        }

        private UsuarioModel ValidarUsuario(UsuarioModel loginDetalhes)
        {
            var usuario = _service.GetFiltro<UsuarioModel>(
               p => p.email == loginDetalhes.email
               && p.senha == loginDetalhes.senha, //where
               null,
               "", null).FirstOrDefault();

            return usuario;
        }

        [HttpPost]
        [Route("validaLogin")]
        public IActionResult Login([FromBody] UsuarioModel loginDetalhes)
        {
            UsuarioModel usu = ValidarUsuario(loginDetalhes);
            if (usu != null)
            {
                if (usu.Status == 0)
                {
                    return Unauthorized(new { message = "Este usuário está inativado." });
                }

                var tokenString = GerarTokenJWT();
                return Ok(new
                {
                    token = tokenString,
                    id = usu.id,
                    nome = usu.nome
                });
            }
            else
            {
                return NotFound(new { message = "Usuário não encontrado." });
            }
        }


        [HttpPost]
        [Route("criarUsuario")]
        public IActionResult CriarUsuario([FromBody] UsuarioModel novoUsuario)
        {
            if (novoUsuario == null)
                return BadRequest(new { message = "Dados do usuário inválidos." });

            var usuarioExistente = _service.GetFiltro<UsuarioModel>(
                p => p.email == novoUsuario.email,
                null,
                "", null).FirstOrDefault();

            if (usuarioExistente != null)
                return BadRequest(new { message = "Usuário já existe." });

            try
            {
                _service.Add<UsuarioModel, UsuarioValidator>(novoUsuario);
                return Ok(new { message = "Usuário criado com sucesso." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"Erro ao criar usuário: {ex.Message}" });
            }
        }


        [HttpGet("{id}")]
        public IActionResult selecionarID(int id)
        {
            if (id == 0)
                return NotFound();
            return Execute(() => _service.GetById<UsuarioModel>(id));
        }

        [HttpGet]
        public IActionResult selecionarTodos()
        {
            return Execute(() => _service.Get<UsuarioModel>());
        }

        [HttpPut]
        public IActionResult Alterar([FromBody] UsuarioModel usuario)
        {
            if (usuario == null)
                return BadRequest("Dados do usuário inválidos.");

            try
            {
                _service.Update<UsuarioModel, UsuarioValidator>(usuario);
                return Ok("Dados salvos com sucesso.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro ao alterar usuário: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult excluir(int id)
        {
            if (id == 0)
                return NotFound();
            return Execute(() => { _service.Delete(id); return true; });
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

        [HttpPut("Inativar/{id}")]
        public IActionResult Inativar(int id)
        {
            if (id == 0)
                return NotFound();

            var usuario = _service.GetById<Usuario>(id);
            if (usuario == null)
                return NotFound();

            usuario.Status = 0; // Inativo
            try
            {
                _service.Update<Usuario, UsuarioValidator>(usuario);
                return Ok("Usuário inativado com sucesso.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro ao inativar usuário: {ex.Message}");
            }
        }
    }
}
