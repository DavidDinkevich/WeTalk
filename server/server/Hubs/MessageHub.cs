using Microsoft.AspNetCore.SignalR;
using server.Models;
using System.Text.Json;

namespace server.Hubs {
    public class MessageHub : Hub {
        public async Task SendMessage(string msgJson) {
            // DISSEMINATE MESSAGE TO RECIPIENT'S GROUP
            // Get "to" group
            var options = new JsonSerializerOptions {
                PropertyNameCaseInsensitive = true
            };
            MsgJson msg = JsonSerializer.Deserialize<MsgJson>(msgJson, options);
            await Clients.Group(msg.To).SendAsync("ReceivedMessage", msgJson);
            // DISSEMINATE MESSAGE TO SENDER'S GROUP
            await Clients.Group(msg.From).SendAsync("ReceivedMessage", msgJson);
        }
        public async Task SendMessageFromForeignServer(MsgJson msg) {
            // DISSEMINATE MESSAGE TO RECIPIENT'S GROUP
            // Get "to" group
            string msgJson = JsonSerializer.Serialize(msg);
            await Clients.Group(msg.To).SendAsync("ReceivedMessage", msgJson);
        }

        

        public async Task AddContact(string groupID, string contact) {
            // DISSEMINATE CONTACT TO RECIPIENT'S GROUP
            // Get "to" group
            var options = new JsonSerializerOptions {
                PropertyNameCaseInsensitive = true
            };
            Contact contactObj = JsonSerializer.Deserialize<Contact>(contact, options);
            await Clients.Group(contactObj.Id).SendAsync("NewContact", contact);
            // DISSEMINATE CONTACT TO SENDER'S GROUP
            await Clients.Group(groupID).SendAsync("NewContact", contact);
        }

        public async Task JoinClientGroup(string groupName)
            => await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

        public string GetConnectionId() => Context.ConnectionId;

    }
}
