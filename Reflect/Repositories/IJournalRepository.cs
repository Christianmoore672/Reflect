using Microsoft.Extensions.Hosting;
using Reflect.Models;

namespace Reflect.Repositories
{
    public interface IJournalRepository
    {
        List<Journal> GetAllJournals();
        List<Journal> GetJournalsByUserProfileId(int userProfileId);
        Journal GetJournalById(int journalId);

        void Add(Journal journal);

    }
}
