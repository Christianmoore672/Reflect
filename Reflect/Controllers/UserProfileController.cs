﻿using Microsoft.AspNetCore.Mvc;
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

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction("GetByEmail", new { email = userProfile.Email }, userProfile);
        }

        [HttpPost("upload-image")]
        public IActionResult UploadImage(IFormFile image)
        {
            if (image != null && image.Length > 0)
            {
                // Generate a unique filename for the uploaded image
                string uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);

                // Builds the fullPath variable which gets the directory of the folder which is wwwroot/ImageUploads
                string uploadsDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "ImageUploads");
                string fullPath = Path.Combine(uploadsDirectory, uniqueFileName);
                //creates a FileStream to essentially save it to the folder
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    image.CopyTo(stream);
                }
                string publicImageUrl = $"/ImageUploads/{uniqueFileName}";
                // Return the URL or file path of the saved image to the frontend
                return Ok(new { imageUrl = publicImageUrl });
            }

            return BadRequest();
        }

    }
}
