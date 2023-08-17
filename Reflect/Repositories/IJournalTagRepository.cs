using System.Collections.Generic;
using Reflect.Models;

namespace Reflect.Repositories
{
    public interface IJournalTagRepository
    {
        List<JournalTag> GetAllJournalTags();
        void Add(JournalTag journalTag);

        List<JournalTag> GetAllJournalTagsByJournalId(int id);
    }
}
