using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Http;


namespace MpPong.PongHandler
{
    /// <summary>
    /// Http handler accepting web socket requests
    /// </summary>
    public class PongHttpHandler : WebSocketHandler
    {
        private HttpContext context;

        public PongHttpHandler(WebSocketConnectionManager webSocketConnectionManager) : base(webSocketConnectionManager)
        {

        }

        public bool IsReusable
        {
            get { return false; }
        }

        public override async Task OnConnected(WebSocket socket)
        {
            await base.OnConnected(socket);

            var socketId = WebSocketConnectionManager.GetId(socket);
            await SendMessageToAllAsync($"{socketId} has connected.");


            // Trying to implement a smooth pong multiplayer experience.
            // Unforturnately, there were too many differences from this project
            // and https://github.com/marcinbudny/WebSocketPong/tree/master/Pong

            //GAME BREAKING!!
            //await ProcessRequestAsync(socket, socketId);

        }

        public async Task ProcessRequestAsync(String socketId)
        {

            // create a player
            var player = new PongPlayer(socketId);
            PongApp.JoinPlayer(player);

            // start receiving from socket
            await player.Receiver();

        }
    }
}