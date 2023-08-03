using System.ComponentModel.DataAnnotations;

namespace Reflect.Models
{
    public class ResearchTopic
    {
        public int Id { get; set; }

        public int UserProfileId { get; set; }

        [Required]
        public string? FolderTitle { get; set; }

        public string? Note { get; set; }

        public string? Link { get; set; }

        [Required]
        public DateTime DateCreated { get; set; }
    }
}
