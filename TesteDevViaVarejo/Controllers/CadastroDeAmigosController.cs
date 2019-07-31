using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TesteDevViaVarejo.Model;

namespace TesteDevViaVarejo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CadastroDeAmigosController : ControllerBase
    {
        private readonly Context _context;

        public CadastroDeAmigosController(Context context)
        {
            _context = context;
        }

        [HttpGet]
        public JsonResult BuscarAmigos()
        {
  
            var listaDeAmigos = from cadastro in _context.CadastroDeAmigos
                                orderby cadastro.Nome
                                select new
                                {
                                    cadastro.Id,
                                    cadastro.Nome,
                                    cadastro.Longitude,
                                    cadastro.Latitude
                                };

            return new JsonResult(listaDeAmigos);
        }


        //api/CadastroDeAmigos/
        [HttpPost("Salvar")]
        public async Task Salvar(CadastrarNovoAmigo model)
        {
            CadastroDeAmigos cadastro = new CadastroDeAmigos();
            cadastro.Nome = model.Nome;
            cadastro.Latitude = model.Latitude;
            cadastro.Longitude = model.Longitude;
            _context.CadastroDeAmigos.Add(cadastro);
            await _context.SaveChangesAsync();
        }


        public class CadastrarNovoAmigo
        {
            public string Nome { get; set; }
            public string Latitude { get; set; }
            public string Longitude { get; set; }
        }
    }
}
