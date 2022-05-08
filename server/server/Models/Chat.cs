namespace server.Models {
    public class Chat {
        public int Id { get; set; }
        public User User1 { get; set; }
        public User User2 { get; set; }
        public ICollection<Message> Messages { get; set; }

        public Chat(User u1, User u2) {
            User1 = u1;
            User2 = u2;
            Messages = new List<Message>();
        }
    }
}
