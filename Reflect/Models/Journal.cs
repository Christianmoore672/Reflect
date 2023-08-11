using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Reflect.Models
{
    public class Journal
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string Content { get; set; }

        public int UserProfileId { get; set; }
        public UserProfile? UserProfile { get; set; }

        [Required]
        public DateTime DateCreated { get; set; }

    }
}
