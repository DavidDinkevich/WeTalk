﻿#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers {
    public class RatingsController : Controller {
        private readonly serverContext _context;

        public RatingsController(serverContext context) {
            _context = context;
        }

        // GET: Ratings
        public async Task<IActionResult> Index() {
            return View(await _context.Rating.ToListAsync());
        }

        public async Task<IActionResult> Search(string query) {
            if (query == null)
                return View(await _context.Rating.ToListAsync());
            var q = _context.Rating.Where(data => data.Message.Contains(query) ||
                                          data.Name.Contains(query) ||
                                          data.RatingsCount.ToString().Contains(query));
            return View(await q.ToListAsync());
        }

        // GET: Ratings/Details/5
        public async Task<IActionResult> Details(int? id) {
            if (id == null) {
                return NotFound();
            }

            var rating = await _context.Rating
                .FirstOrDefaultAsync(m => m.Id == id);
            if (rating == null) {
                return NotFound();
            }

            return View(rating);
        }

        // GET: Ratings/Create
        public IActionResult Create() {
            return View();
        }

        // POST: Ratings/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,RatingsCount,Name,Message,Time")] Rating rating) {
            if (ModelState.IsValid) {
                _context.Add(rating);
                //                rating.setTime()
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Search));
            }
            return View(rating);
        }

        // GET: Ratings/Edit/5
        public async Task<IActionResult> Edit(int? id) {
            if (id == null) {
                return NotFound();
            }

            var rating = await _context.Rating.FindAsync(id);
            if (rating == null) {
                return NotFound();
            }
            return View(rating);
        }

        // POST: Ratings/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,RatingsCount,Name,Message")] Rating rating) {
            if (id != rating.Id) {
                return NotFound();
            }

            if (ModelState.IsValid) {
                try {
                    _context.Update(rating);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException) {
                    if (!RatingExists(rating.Id)) {
                        return NotFound();
                    }
                    else {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Search));
            }
            return View(rating);
        }

        // GET: Ratings/Delete/5
        public async Task<IActionResult> Delete(int? id) {
            if (id == null) {
                return NotFound();
            }

            var rating = await _context.Rating
                .FirstOrDefaultAsync(m => m.Id == id);
            if (rating == null) {
                return NotFound();
            }

            return View(rating);
        }

        // POST: Ratings/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id) {
            var rating = await _context.Rating.FindAsync(id);
            _context.Rating.Remove(rating);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Search));
        }

        private bool RatingExists(int id) {
            return _context.Rating.Any(e => e.Id == id);
        }
    }
}