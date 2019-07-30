using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TesteDevViaVarejo.Model;

namespace TesteDevViaVarejo.Controllers
{
    [Route("api/[controller]")]
    public class CadastroDeAmigosController : Controller
    {
        private readonly Context _context;

        public CadastroDeAmigosController(Context context)
        {
            _context = context;
        }

        //api/CadastroDeAmigos/
        [HttpPost]
        public async void Salvar(CadastroDeAmigos model)
        {

            string a = model.Nome;
            _context.CadastroDeAmigos.Add(model);
            await _context.SaveChangesAsync();

        }


        public class cadastro
        {
            public string Nome { get; set; }
            public string Latitude { get; set; }
            public string Longitude { get; set; }
        }
    }
}
