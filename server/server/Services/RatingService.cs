using server.Models;
using server.Data;
using Microsoft.EntityFrameworkCore;

namespace server.Services
{
    public class RatingService : IRatingService
    {

        private readonly serverContext _context;

        public RatingService(serverContext context)
        {
            _context = context;
        }
        public async Task<List<Rating>> GetRatings()
        {
            if (_context.Rating == null)
            {
                return null;
            }
            return await _context.Rating.ToListAsync();
        }

        

        public async Task<Rating> Add(Rating rating)
        {
            _context.Add(rating);
            await _context.SaveChangesAsync();
            return rating;
        }

        public async Task<bool> Delete(int id)
        {
            var ratings = await GetRatings();
            var rating = ratings.Find(m => m.Id == id);
            //_context.Remove(rating);
            _context.Rating.Remove(rating);
            await _context.SaveChangesAsync();

            return true;
        }
        
        public async Task<Rating> Get(int id)
        {
            var ratings = await GetRatings();
            return ratings.Find(x => x.Id == id);
        }


        public IQueryable<Rating> Search(string query)
        {
            int numericValue;
            if (int.TryParse(query, out numericValue))
            {
                IQueryable<Rating> a_num = _context.Rating.Where(c => c.RatingsCount == numericValue);
                return a_num;
            }
            IQueryable<Rating> a_str = _context.Rating.Where(c => c.Name.Contains(query));
            return a_str;
        }

        public async Task<Rating> Update(int id, string name, int ratingCount, string massage)
        {
            Rating rating = await Get(id);
            rating.RatingsCount = ratingCount;
            rating.Message = massage;
            rating.Name = name;
            await _context.SaveChangesAsync();

            return rating;
        }
    }
}
