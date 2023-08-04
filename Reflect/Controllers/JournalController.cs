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
            return Ok(_journalRepository.GetAll());
        }

        [HttpPost]
        public IActionResult Add(Journal journal)
        {
            _journalRepository.Add(journal);
            return CreatedAtAction("Get", new { id = journal.Id }, journal);
        }
    }
}