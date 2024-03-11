using LocadoraDeFilmes.Data;
using LocadoraDeFilmes.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LocadoraDeFilmes.Controllers;
[ApiController]
[Route("api/usuario")]
public class UsuarioController : ControllerBase
{
    private readonly AppDataContext _ctx;
    public UsuarioController(AppDataContext ctx)
    {
        _ctx = ctx;
    }

    [HttpPost]
    [Route("cadastrar")]
    public ActionResult Cadastrar([FromBody] Usuario usuario)
    {
        //Verifica pelo cpf se o usuario ja esta cadastrado
        var usuarioExistente = _ctx.Usuarios.FirstOrDefault(x => x.Cpf == usuario.Cpf);
        if(usuarioExistente != null){
            return BadRequest("Usuário já está cadastrado");
        }
        try
        //
        {
            _ctx.Usuarios.Add(usuario);
            _ctx.SaveChanges();
            return Created("", usuario);
          
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet]
    [Route("listar")]
    public ActionResult Listar(){
        try
        {
            var usuarios = _ctx.Usuarios.ToList();

            if (usuarios.Count == 0){
                return NotFound("Nenhum Usuário Encontrado.");
            }
            return usuarios.Count == 0? NotFound() : Ok(usuarios);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }    

    [HttpGet]
    [Route("buscar/{cpf}")]
    public IActionResult Buscar([FromRoute] int cpf)
    {
        try
        {
            Usuario? usuarioCadastrado = _ctx.Usuarios.FirstOrDefault(x => x.Cpf == cpf);

            if (usuarioCadastrado != null)
            {
                return Ok(usuarioCadastrado);
            }

            return NotFound($"Nenhum Usuário encontrado com o cpf '{cpf}'.");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut]
    [Route("alterar/{cpf}")]
    public IActionResult Alterar([FromRoute] int cpf, [FromBody] Usuario Usuario)
    {
        try
        {
            Usuario? usuarioCadastrado = _ctx.Usuarios.FirstOrDefault(X => X.Cpf == cpf);
            if (usuarioCadastrado != null)
            {
                usuarioCadastrado.Nome = Usuario.Nome;
                usuarioCadastrado.Idade = Usuario.Idade;
                _ctx.Usuarios.Update(usuarioCadastrado);
                _ctx.SaveChanges();

                return Ok(usuarioCadastrado);
            }
            return NotFound();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }


    [HttpDelete]
    [Route("deletar/{cpf}")]
    public IActionResult Deletar([FromRoute] int cpf){
        try
        {
            Usuario? usuarioCadastrado = _ctx.Usuarios.Find(cpf);
            if(usuarioCadastrado != null){
                _ctx.Usuarios.Remove(usuarioCadastrado);
                _ctx.SaveChanges();
                return Ok($"Usuário com o cpf {cpf} foi Deletado.");
            }

            return NotFound("Usuário não foi encontrado!");
        }
        catch (Exception e) 
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("alugar/{filmeid}/{cpf}")]
    public IActionResult Alugar([FromRoute] int filmeid, [FromRoute] int cpf)
    {
        try
        {
            Usuario? usuarioCadastrado = _ctx.Usuarios.FirstOrDefault(x => x.Cpf == cpf);
            Filme? filmeCadastrado = _ctx.Filmes.FirstOrDefault(x => x.FilmeID == filmeid);

            if(usuarioCadastrado == null){
                return NotFound("Usuário não encontrado");
            }
            if(filmeCadastrado == null){
                return NotFound("Filme não encontrado");
            }
            if ((usuarioCadastrado.Idade >= filmeCadastrado.Classif_ind) && filmeCadastrado.Alugado == false)
            {
                filmeCadastrado.Alugado = true;
                _ctx.Filmes.Update(filmeCadastrado);
                _ctx.SaveChanges();
                return Ok($"'{filmeCadastrado}' Alugado!");
            }
            return NotFound();

        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }

    }

    [HttpGet("devolver/{filmeid}")]
    public IActionResult Devolver([FromRoute] int filmeid){
        try
        {
            Filme? filmeCadastrado = _ctx.Filmes.FirstOrDefault(x => x.FilmeID == filmeid);
            
            if(filmeCadastrado == null){
                return NotFound("Filme não encontrado");
            }
            if(filmeCadastrado.Alugado == false){
                return BadRequest("Filme não está sendo alugado");
            }
             filmeCadastrado.Alugado = false;
                _ctx.Filmes.Update(filmeCadastrado);
                _ctx.SaveChanges();
                return Ok($"'{filmeCadastrado}' Filme Devolvido!");

        }
       catch(Exception e)
        {
            return BadRequest(e.Message);
        }

    }

}
