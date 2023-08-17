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
    public class JournalTagController : ControllerBase
    {
        private readonly IJournalTagRepository _journalTagRepository;
        public JournalTagController(IJournalTagRepository journalTagRepository)
        {
            _journalTagRepository = journalTagRepository;
        }

        //[HttpGet("{id}")]
        //public IActionResult GetAllJournalTags(int id)
        //{
         //   return Ok(_journalTagRepository.GetAllJournalTagsByJournalId(id));
        //}

        [HttpGet("{id}")]
        public IActionResult GetAllJournalTags(int id)
        {
            var journalTags = _journalTagRepository.GetAllJournalTagsByJournalId(id);
            if (journalTags == null)
            {
                return NotFound(); 
            }
            return Ok(journalTags); 
        }



        [HttpPost]
        public IActionResult Post(JournalTag journalTag)
        {
            _journalTagRepository.Add(journalTag);
            return CreatedAtAction("Get", new { id = journalTag.Id }, journalTag);
        }

    }

}

