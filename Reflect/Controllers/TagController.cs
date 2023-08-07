using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Reflect.Models;
using Reflect.Repositories;


namespace Reflect.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly ITagRepository _tagRepository;
        public TagController(ITagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_tagRepository.GetAllTags());

        }
        [HttpGet("GetUsersTags/{id}")]
        public IActionResult Get(int id)
        {
            List<Tag> tags = _tagRepository.GetTagsByUserProfileId(id);
            if (tags == null)
            {
                return NotFound();
            }
            return Ok(tags);
        }
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            Tag tag = _tagRepository.GetTagById(id);
            if (tag == null)
            {
                return NotFound();
            }
            return Ok(tag);
        }

        [HttpPost]
        public IActionResult Post(Tag tag)
        {
            _tagRepository.Add(tag);
            return CreatedAtAction("Get", new { id = tag.Id }, tag);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _tagRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Tag tag)
        {
            if (id != tag.Id)
            {
                return BadRequest();
            }
            _tagRepository.Update(tag);
            return NoContent();
        }
    }
}