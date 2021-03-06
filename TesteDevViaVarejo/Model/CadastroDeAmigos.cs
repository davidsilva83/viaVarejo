﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TesteDevViaVarejo.Model
{
    [Table("CadastroDeAmigos")]
    public class CadastroDeAmigos
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Nome { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
    }
}
