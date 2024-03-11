using System.Security.Cryptography;
using LocadoraDeFilmes.Data;
using LocadoraDeFilmes.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LocadoraDeFilmes.Controllers;

[ApiController]
[Route("api/filme")]
public class FilmeController : ControllerBase
{
    //
    //Instaciando um Banco
    private readonly AppDataContext _ctx;

    public FilmeController(AppDataContext ctx){
        _ctx = ctx;
    }
    //

    //
    //Método "Cadastrar"
    [HttpPost("cadastrar")]
    public IActionResult Cadastrar([FromBody] Filme filme)
    {
        try{
            var filmeExistente = _ctx.Filmes.FirstOrDefault(x => x.Nome == filme.Nome);
            if(filmeExistente != null){
                return BadRequest("Filme já está cadastrado");
            }
            Genero? genero = _ctx.Generos.Find(filme.GeneroID);
            if(genero == null){
                return NotFound();
            }
            Filme NovoFilme = new Filme
            {
                Nome = filme.Nome,
                Classif_ind = filme.Classif_ind,
                Ano_lanc = filme.Ano_lanc,
                Genero = genero,
                GeneroID = filme.GeneroID
            };
            _ctx.Filmes.Add(NovoFilme);
            _ctx.SaveChanges();

            return Created("", NovoFilme);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }

    }
    //Fim método
    //

    //
    //Método Listar
    [HttpGet("listar")]
    public IActionResult Listar()
    {
        try
        {

            List<Filme> filmes = _ctx.Filmes.Include(x => x.Genero).ToList();

            return filmes.Count == 0? NotFound("Nenhum Filme Encontrado.") : Ok(filmes);

        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    //Fim Método
    //

    //
    //Método "Buscar"
    [HttpGet("buscar/{id}")]
    public IActionResult Buscar([FromRoute] int id)
    {
        try
        {

            Filme? filmeCadastrado = _ctx.Filmes.FirstOrDefault(x => x.FilmeID == id);

            if (filmeCadastrado != null)
            {
                return Ok(filmeCadastrado);
            }

            return NotFound($"Nenhum Filme encontrado com o Id '{id}'.");

        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    //Fim método
    //
    
    //
    //Método "Alterar"
    [HttpPut("alterar/{id}")]
    public IActionResult Alterar([FromRoute] int id, [FromBody] Filme Filme)
    {
        try
        {

            Filme? filmeCadastrado = _ctx.Filmes.FirstOrDefault(x => x.FilmeID == id);
            
            if (filmeCadastrado != null)
            {
                filmeCadastrado.Nome = Filme.Nome;
                filmeCadastrado.Classif_ind = Filme.Classif_ind;
                filmeCadastrado.Ano_lanc = Filme.Ano_lanc;
                filmeCadastrado.GeneroID = Filme.GeneroID;

                _ctx.Filmes.Update(filmeCadastrado);
                _ctx.SaveChanges();

                return Ok(filmeCadastrado);
            }

            return NotFound();

        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    //Fim método
    //

    //
    //Método "Deletar"
    [HttpDelete("deletar/{id}")]
    public IActionResult Deletar([FromRoute] int id)
    {
        try
        {

            Filme? filmeCadastrado = _ctx.Filmes.Find(id);
            if (filmeCadastrado != null)
            {
                _ctx.Filmes.Remove(filmeCadastrado);
                _ctx.SaveChanges();
                
                return Ok(_ctx.Filmes.Include(x=>x.Genero).ToList());
            }
            return NotFound("Nenhum Filme Encontrado.");

        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    //Fim método
    //

    [HttpGet("listarAlugados")]
    public IActionResult Alugados()
    {
        try
        {

            var filmesAlugado = _ctx.Filmes.Where(filme => filme.Alugado == true).ToList();

            return filmesAlugado.Count == 0? NotFound("Nenhum Filme Alugado Encontrado.") : Ok(filmesAlugado);

        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("listarDisponiveis")]
    public IActionResult Disponiveis()
    {
        try
        {

            var filmesAlugado = _ctx.Filmes.Where(filme => filme.Alugado == false).ToList();

            return filmesAlugado.Count == 0? NotFound("Nenhum Filme Alugado Encontrado.") : Ok(filmesAlugado);

        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

}
