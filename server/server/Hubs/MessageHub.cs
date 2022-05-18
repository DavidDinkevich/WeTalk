using Microsoft.AspNetCore.SignalR;

namespace server.Hubs {
    public class MessageHub : Hub {
        public async Task SendMessage(string msgJson) {
            await Clients.All.SendAsync("ReceivedMessage", msgJson);
        }

        public async Task AddContact(string contact) {
            await Clients.All.SendAsync("NewContact", contact);
        }
    }
}
