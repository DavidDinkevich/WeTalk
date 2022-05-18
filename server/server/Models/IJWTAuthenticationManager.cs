namespace server.Models {
    public interface IJWTAuthenticationManager {
        string Authenticate(string username, string password);
    }
}
