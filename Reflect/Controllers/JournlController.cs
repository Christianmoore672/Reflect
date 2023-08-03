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
    }
}