﻿namespace server.Models {
    public class Message {
        public int Id { get; set; }
        public string Sender { get; set; }
        public string Recipient { get; set; }
        public string MessageText { get; set; }
        public string Time { get; set; }

        public Message(string sender, string recipient) {
            Sender = sender;
            Recipient = recipient;
            MessageText = "";
            Time = "";
        }
        
    }
}