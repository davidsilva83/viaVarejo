using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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

        [HttpGet("Calcular")]
        public JsonResult Calcular()
        {

            var listaDeAmigos = _context.CadastroDeAmigos.ToArray();

            int latitudeAntigo = 0, longitudeAntigo = 0;

            String mensagem = "";

            foreach (var amigo in listaDeAmigos)
            {                              
                if(latitudeAntigo < int.Parse(amigo.Latitude) && longitudeAntigo < int.Parse(amigo.Longitude))
                {
                    latitudeAntigo = int.Parse(amigo.Latitude);
                    longitudeAntigo = int.Parse(amigo.Longitude);

                    mensagem = "O amigo mais perto de você é " + amigo.Nome;
                }                
            }

            var jsonEnvio = new
            {
                mensagem
            };

            return new JsonResult(jsonEnvio);
        }

        public IQueryable ConsultaAmigosCadastrados()
        {
            var listaDeAmigos = from cadastro in _context.CadastroDeAmigos
                                orderby cadastro.Nome
                                select( new
                                {
                                    cadastro.Id,
                                    cadastro.Nome,
                                    cadastro.Longitude,
                                    cadastro.Latitude
                                });
            return listaDeAmigos;
        }
        

        //api/CadastroDeAmigos
        [HttpGet]
        public JsonResult BuscarAmigos()
        {
            var listaDeAmigos = ConsultaAmigosCadastrados();
            return new JsonResult(listaDeAmigos);
        }

        //api/CadastroDeAmigos/Apagar
        [HttpPost("Apagar")]
        public async Task Apagar(ModelCadastrarAmigo model)
        {
            var amigoCadastrado = await _context.CadastroDeAmigos.FindAsync(model.Id);
            if (amigoCadastrado != null)
            {
                _context.CadastroDeAmigos.Remove(amigoCadastrado);
                await _context.SaveChangesAsync();
            }
        }

        //api/CadastroDeAmigos/Salvar
        [HttpPost("Cadastrar")]
        public async Task Cadastrar(ModelCadastrarAmigo model)
        {
            CadastroDeAmigos cadastro = new CadastroDeAmigos();
            cadastro.Nome = model.Nome;
            cadastro.Latitude = model.Latitude;
            cadastro.Longitude = model.Longitude;
            _context.CadastroDeAmigos.Add(cadastro);
            await _context.SaveChangesAsync();
        }
        

        public class ModelCadastrarAmigo
        {
            public int Id { get; set; }
            public string Nome { get; set; }
            public string Latitude { get; set; }
            public string Longitude { get; set; }
        }
    }
}
