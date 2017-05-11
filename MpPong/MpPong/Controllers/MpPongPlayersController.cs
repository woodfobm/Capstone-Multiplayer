using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using MpPong.Data;
using MpPong.Models;

namespace MpPong.Controllers
{
    public class MpPongPlayersController : Controller
    {
        private readonly MpPongPlayerContext _context;

        public MpPongPlayersController(MpPongPlayerContext context)
        {
            _context = context;    
        }

        // GET: MpPongPlayers
        public async Task<IActionResult> Index()
        {
            return View(await _context.MpPongPlayers.ToListAsync());
        }

        // GET: MpPongPlayers/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var mpPongPlayer = await _context.MpPongPlayers
                .SingleOrDefaultAsync(m => m.ID == id);
            if (mpPongPlayer == null)
            {
                return NotFound();
            }

            return View(mpPongPlayer);
        }

        // GET: MpPongPlayers/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: MpPongPlayers/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID,playerUsername,playerPassword,playerWins,playerLoses")] MpPongPlayer mpPongPlayer)
        {
            if (ModelState.IsValid)
            {
                _context.Add(mpPongPlayer);
                await _context.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(mpPongPlayer);
        }

        // GET: MpPongPlayers/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var mpPongPlayer = await _context.MpPongPlayers.SingleOrDefaultAsync(m => m.ID == id);
            if (mpPongPlayer == null)
            {
                return NotFound();
            }
            return View(mpPongPlayer);
        }

        // POST: MpPongPlayers/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ID,playerUsername,playerPassword,playerWins,playerLoses")] MpPongPlayer mpPongPlayer)
        {
            if (id != mpPongPlayer.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(mpPongPlayer);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!MpPongPlayerExists(mpPongPlayer.ID))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction("Index");
            }
            return View(mpPongPlayer);
        }

        // GET: MpPongPlayers/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var mpPongPlayer = await _context.MpPongPlayers
                .SingleOrDefaultAsync(m => m.ID == id);
            if (mpPongPlayer == null)
            {
                return NotFound();
            }

            return View(mpPongPlayer);
        }

        // POST: MpPongPlayers/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var mpPongPlayer = await _context.MpPongPlayers.SingleOrDefaultAsync(m => m.ID == id);
            _context.MpPongPlayers.Remove(mpPongPlayer);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        private bool MpPongPlayerExists(int id)
        {
            return _context.MpPongPlayers.Any(e => e.ID == id);
        }
    }
}
