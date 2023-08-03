using Reflect.Models;

namespace Reflect.Repositories
{
    public interface IUserRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByEmail(string email);

    }
}
