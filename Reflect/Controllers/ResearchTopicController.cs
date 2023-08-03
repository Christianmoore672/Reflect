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
                return Ok(_researchTopicRepository.GetAll());

            }
        }
    }
