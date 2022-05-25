using server.Models;

namespace server.Services
{
    public interface IRatingService
    {
        public Task<List<Rating>> GetRatings();

        public IQueryable<Rating> Search(string query);

        public Task<Rating> Get(int id);

        public Task<Rating> Update(int id, string name, int grade, string feedback);

        public Task<bool> Delete(int id);

        public Task<Rating> Add(Rating rating);

    }
}
