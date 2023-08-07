using Reflect.Models;

namespace Reflect.Repositories
{
    public interface ITagRepository
    {
        List<Tag> GetAllTags();
        List<Tag> GetTagsByUserProfileId(int userProfileId);
        Tag GetTagById(int tagId);

        void Add(Tag tag);

        void Delete(int id);

        void Update(Tag tag);
    }
}