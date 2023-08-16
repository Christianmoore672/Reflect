using System;
using Microsoft.AspNetCore.Http;
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
            return Ok(_journalRepository.GetAllJournals());
        }

        [HttpGet("GetUsersJournals/{id}")]
        public IActionResult Get(int id)
        {
            List<Journal> journals = _journalRepository.GetJournalsByUserProfileId(id);
            if (journals == null)
            {
                return NotFound();
            }
            return Ok(journals);
        }
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            Journal journal = _journalRepository.GetJournalById(id);
            if (journal == null)
            {
                return NotFound();
            }
            return Ok(journal);
        }

        [HttpPost]
        public IActionResult Post(Journal journal)
        {
            _journalRepository.Add(journal);
            return CreatedAtAction("Get", new { id = journal.Id }, journal);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _journalRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Journal journal)
        {
            if (id != journal.Id)
            {
                return BadRequest();
            }
            journal.DateCreated = DateTime.Now;
            _journalRepository.Update(journal);
            return NoContent();
        }

        [HttpPost("journalTag")]
        public IActionResult Post(JournalTag journalTag)
        {
            _journalRepository.AddTag(journalTag);
            return CreatedAtAction("Get", new { id = journalTag.Id }, journalTag);
        }

    }
}