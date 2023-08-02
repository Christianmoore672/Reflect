using Reflect.Models;

namespace Reflect.Repositories
{
    public interface IJournalRepository
    {
        List<Journal> GetAll();
        Journal GetById(int id);
        void Add(Journal journal);
        void Delete(int id);
        void Update(Journal journal);
    }
}
