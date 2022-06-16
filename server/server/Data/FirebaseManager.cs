using System.ComponentModel.DataAnnotations;

namespace server.Models {
    public class FirebaseManager {

        public static Dictionary<string, string> UsernameToToken = new Dictionary<string, string>();

        public static void AddUser(string? username, string? firebaseToken) {
            UsernameToToken[username] = firebaseToken;
        }

        public static string? GetTokenByUsername(string username) {
            if(!UsernameToToken.ContainsKey(username))
                return null;
            return UsernameToToken[username];
        }
    }
}
