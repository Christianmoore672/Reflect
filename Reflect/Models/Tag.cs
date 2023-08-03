using System.ComponentModel.DataAnnotations;
using System.ComponentModel;


namespace Reflect.Models
{
    public class Tag
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public int JournalId { get; set; }

        public int? UserProfileId { get; set; }
    }
}
