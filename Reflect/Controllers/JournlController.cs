using System;
using Microsoft.AspNetCore.Mvc;
using Reflect.Repositories;
using Reflect.Models;
using Microsoft.Extensions.Hosting;

namespace Reflect.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JournalController : ControllerBase
    {
        private readonly IJournalRepository _journalRepository;
        public JournalController(IJournalRepository journalRepository)
        {
            _journalRepository = journalRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_journalRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = _journalRepository.GetById(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        [HttpPost]
        public IActionResult Journal(Journal journal)
        {
            _journalRepository.Add(journal);
            return CreatedAtAction("Get", new { id = journal.Id }, journal);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Journal journal)
        {
            if (id != journal.Id)
            {
                return BadRequest();
            }

            _journalRepository.Update(journal);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _journalRepository.Delete(id);
            return NoContent();
        }
    }
}