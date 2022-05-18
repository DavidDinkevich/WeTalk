using Microsoft.AspNetCore.SignalR;
using server.Models;
using System.Text.Json;

namespace server.Hubs {
    public class MessageHub : Hub {
        public async Task SendMessage(string msgJson) {
//            MsgJson msg = JsonSerializer.Deserialize<MsgJson>(msgJson);

            Console.WriteLine("You got mailllllllllllllll " + msgJson);
            await Clients.All.SendAsync("ReceivedMessage", msgJson);
        }

        public async Task AddContact(string msgJson) {
            Console.WriteLine("added contact:" + msgJson);
            await Clients.All.SendAsync("NewContact", msgJson);
        }
    }
}
