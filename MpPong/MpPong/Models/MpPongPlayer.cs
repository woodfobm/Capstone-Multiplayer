using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MpPong.Models
{
    public class MpPongPlayer
    {
        // By default, "ID" is interpretted as a primary key
        public int ID { get; set; }
        public string playerUsername { get; set; }
        public string playerPassword { get; set; }
        public int playerWins { get; set; }
        public int playerLoses { get; set; }
    }
}
