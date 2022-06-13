using server.Data;

namespace server.Models {
    public interface IJWTAuthenticationManager {
        string MakeToken(string username);
    }
}
