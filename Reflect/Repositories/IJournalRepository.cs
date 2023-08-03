using Reflect.Models;

namespace Reflect.Repositories
{
    public interface IJournalRepository
    {
        List<Journal> GetAll();
        Journal GetById(int id);
    }
}
