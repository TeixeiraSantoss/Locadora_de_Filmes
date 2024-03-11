using LocadoraDeFilmes.Data;
using LocadoraDeFilmes.Models;
using Microsoft.AspNetCore.Mvc;

namespace LocadoraDeFilmes.Controllers;


[ApiController]
[Route("api/genero")]
public class GeneroController : ControllerBase
{

    private readonly AppDataContext _ctx;

    public GeneroController(AppDataContext ctx)
    {
        _ctx = ctx;
    }

    // --------------------
    //  CADASTRAR GENERO
    // --------------------

    [HttpPost]
    [Route("cadastrar")]
    public IActionResult Cadastrar([FromBody] Genero genero)
    {
        var generoExistente = _ctx.Generos.FirstOrDefault(x => x.GeneroNome == genero.GeneroNome);
        if(generoExistente != null){
            return BadRequest("Gênero já está cadastrado");
        }
        try
        {
            _ctx.Generos.Add(genero);
            _ctx.SaveChanges();
            return Created("", genero);

        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    // --------------------
    //  LISTAR GENERO
    // --------------------

    [HttpGet]
    [Route("listar")]
    public IActionResult Listar()
    {
        try
        {
            var generos = _ctx.Generos.ToList();

            if (generos.Count == 0)
            {
                return NotFound("Nenhum gênero encontrado.");
            }

            return generos.Count == 0 ? NotFound() : Ok(generos);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    // --------------------
    //  BUSCAR GENERO - Nome
    // --------------------

    [HttpGet]
    [Route("buscar/{nome}")]
    public IActionResult Buscar([FromRoute] string nome)
    {
        try
        {
            Genero? generoCadastrado = _ctx.Generos.FirstOrDefault(x => x.GeneroNome == nome);

            if (generoCadastrado != null)
            {
                return Ok(generoCadastrado);
            }

            return NotFound($"Nenhum gênero encontrado com o nome '{nome}'.");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    // --------------------
    //  BUSCAR GENERO - id
    // --------------------

    [HttpGet]
    [Route("buscarID/{id}")]
    public IActionResult BuscarPorId(int id)
    {
        try
        {   
            Genero generoCadastrado = _ctx.Generos.FirstOrDefault(g => g.GeneroID == id);

            if (generoCadastrado == null)
            {
                return NotFound($"Nenhum gênero encontrado com o ID '{id}'.");
            }

            return Ok(generoCadastrado);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    // --------------------
    //  ALTERAR GENERO - id
    // --------------------

    [HttpPut]
    [Route("alterar/{id}")]
    public IActionResult Alterar([FromRoute] int id, [FromBody] Genero genero)
    {
        try
        {
            Genero? generoCadastrado = _ctx.Generos.FirstOrDefault(X => X.GeneroID == id);
            if (generoCadastrado != null)
            {
                generoCadastrado.GeneroNome = genero.GeneroNome;
                _ctx.Generos.Update(generoCadastrado);
                _ctx.SaveChanges();
                return Ok("Gênero alterado com sucesso.");
            }
            return NotFound();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    // --------------------
    //  DELETAR GENERO - id
    // --------------------

    [HttpDelete]
    [Route("deletar/{id}")] 
    public IActionResult Deletar([FromRoute] int id)
    {
        try
        {
            Genero? generoCadastrado = _ctx.Generos.Find(id);

            if (generoCadastrado != null)
            {
                _ctx.Generos.Remove(generoCadastrado);
                _ctx.SaveChanges();
                return Ok("Gênero apagado com sucesso.");
            }

            return NotFound();

        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

}
