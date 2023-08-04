using Microsoft.AspNetCore.Mvc;
using Reflect.Models;
using Reflect.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Reflect.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        //private readonly IUserRepository _userRepository;

        public UserProfileController(
            //IUserRepository userRepository,
            IUserProfileRepository userProfileRepository
        )
        {
            _userProfileRepository = userProfileRepository;
            //_userRepository = userRepository;
        }

        // GET: api/<UserProfileController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userProfileRepository.GetAll());
        }

        // GET: api/<UserProfileController>/5 - getById/details
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            var userProfile = _userProfileRepository.GetById(id);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

        [HttpGet("GetByEmail")]
        public IActionResult GetByEmail(string email)
        {
            var user = _userProfileRepository.GetByEmail(email);

            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

    }
}
