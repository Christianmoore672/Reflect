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
        public class ResearchTopicController : ControllerBase
        {
            private readonly IResearchTopicRepository _researchTopicRepository;
            public ResearchTopicController(IResearchTopicRepository researchTopicRepository)
            {
            _researchTopicRepository = researchTopicRepository;
            }
            [HttpGet]
            public IActionResult Get()
            {
                return Ok(_researchTopicRepository.GetAllResearchTopics());

            }

        [HttpGet("GetUsersResearchTopics/{id}")]
        public IActionResult Get(int id)
        {
            List<ResearchTopic> researchTopics = _researchTopicRepository.GetResearchByUserProfileId(id);
            if (researchTopics == null)
            {
                return NotFound();
            }
            return Ok(researchTopics);
        }
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            ResearchTopic researchTopic = _researchTopicRepository.GetResearchTopicById(id);
            if (researchTopic == null)
            {
                return NotFound();
            }
            return Ok(researchTopic);
        }

        [HttpPost]
        public IActionResult Post(ResearchTopic researchTopic)
        {
            _researchTopicRepository.Add(researchTopic);
            return CreatedAtAction("Get", new { id = researchTopic.Id }, researchTopic);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _researchTopicRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, ResearchTopic researchTopic)
        {
            if (id != researchTopic.Id)
            {
                return BadRequest();
            }
            researchTopic.DateCreated = DateTime.Now;
            _researchTopicRepository.Update(researchTopic);
            return NoContent();
        }
    }
    }
