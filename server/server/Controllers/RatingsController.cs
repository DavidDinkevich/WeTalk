#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [AllowAnonymous]
    public class RatingsController : Controller
    {
        private IRatingService _service;

        public RatingsController(IRatingService service)
        {
            _service = service;
        }

        // GET: Ratings
        public async Task<IActionResult> Index()
        {
            if (await _service.GetRatings() == null)
            {
                return NotFound();
            }
            return View(await _service.GetRatings());
        }


        [HttpGet]
        public async Task<IActionResult> Search(string query)
        {
            if (string.IsNullOrEmpty(query)) {
                return View(await _service.GetRatings());
            }
            //var q = _service.GetRatings().Where(rating => rating.RatingsCount.Contains(query));
            var q = _service.Search(query);
            // return View(await q.ToListAsync());
            return Json(await q.ToListAsync());
        }

        // GET: Ratings/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var ratings = await _service.GetRatings();
            var rating = ratings.FirstOrDefault(m => m.Id == id);
            if (rating == null)
            {
                return NotFound();
            }

            return View(rating);
        }

        // GET: Ratings/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Ratings/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,RatingsCount,Name,Message,Time")] Rating rating)
        {
            if (ModelState.IsValid)
            {
                rating.Time = DateTime.Now;
                await _service.Add(rating);
               // await _service.SaveChangesAsync();
                return RedirectToAction(nameof(Search));
            }
            return View(rating);
        }

        // GET: Ratings/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var ratings = await _service.GetRatings();
            var rating = ratings.Find(m => m.Id == id);
            if (rating == null)
            {
                return NotFound();
            }
            return View(rating);

        
        }

        // POST: Ratings/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,RatingsCount,Name,Message,Time")] Rating rating)
        {
            if (id != rating.Id)
            {
                return NotFound();
            }
            
            if (ModelState.IsValid)
            {
                try
                {
                    //_context.Update(rating);
                    //await _context.SaveChangesAsync();
                    await _service.Update(rating.Id, rating.Name, rating.RatingsCount, rating.Message);
                }
                catch (DbUpdateConcurrencyException)
                {
                    var isExists = await RatingExists(rating.Id);
                    if (!isExists)
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Search));
            }
            return View(rating);
        }

        // GET: Ratings/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var ratings = await _service.GetRatings();
            var rating = ratings.FirstOrDefault(m => m.Id == id);
            if (rating == null)
            {
                return NotFound();
            }

            return View(rating);
        }

        // POST: Ratings/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var ratings = await _service.GetRatings();
            var rating = ratings.Find(m => m.Id == id);
            await _service.Delete(id);
            //_context.Rating.Remove(rating);
            return RedirectToAction(nameof(Search));
        }

        private async Task<bool> RatingExists(int id)
        {
            var ratings = await _service.GetRatings();
            return ratings.Any(e => e.Id == id);
        }
    }
}
