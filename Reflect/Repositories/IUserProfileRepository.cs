using Reflect.Models;

namespace Reflect.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByEmail(string email);
        List<UserProfile> GetAll();
        UserProfile GetById(int id);

    }
}
