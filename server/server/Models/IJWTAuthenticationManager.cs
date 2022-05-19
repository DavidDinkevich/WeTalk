using server.Data;

namespace server.Models {
    public interface IJWTAuthenticationManager {
        string Authenticate(serverContext dbContext, string username, string password);
    }
}
