using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MpPong.Models;

namespace MpPong.Data
{
    public static class DbInitializer
    {
        public static void Initialize(MpPongPlayerContext context)
        {
            context.Database.EnsureCreated();

            // Look for any players
            if (context.MpPongPlayers.Any())
            {
                return; // Database has been seeded / exists
            }


            // If it doesn't exist, create some data for first time users
            // ID is auto incremented, no need to use it as a field.
            var mpPongPlayers = new MpPongPlayer[]
            {
                new MpPongPlayer{playerUsername="Andrew",playerPassword="Frideres",playerWins=3,playerLoses=2},
                new MpPongPlayer{playerUsername="Brandon",playerPassword="Woodford",playerWins=2,playerLoses=1},
                new MpPongPlayer{playerUsername="Matthew",playerPassword="George",playerWins=10,playerLoses=2},
                new MpPongPlayer{playerUsername="Tristin",playerPassword="Nelson",playerWins=1,playerLoses=5}
            };

            foreach(MpPongPlayer mp in mpPongPlayers)
            {
                context.MpPongPlayers.Add(mp);
            }

            context.SaveChanges();
        }
    }
}



