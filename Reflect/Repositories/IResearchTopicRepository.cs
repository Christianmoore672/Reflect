using Reflect.Models;

namespace Reflect.Repositories
{
    public interface IResearchTopicRepository
    {
        List<ResearchTopic> GetAllResearchTopics();
        List<ResearchTopic> GetResearchByUserProfileId(int userProfileId);
        ResearchTopic GetResearchTopicById(int researchTopicId);

        void Add(ResearchTopic researchTopic);

        void Delete(int id);

        void Update(ResearchTopic researchTopic);
    }
}
