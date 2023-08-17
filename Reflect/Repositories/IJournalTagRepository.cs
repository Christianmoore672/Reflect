using System.Collections.Generic;
using Reflect.Models;

namespace Reflect.Repositories
{
    public interface IJournalTagRepository
    {

        void Add(JournalTag journalTag);

        List<JournalTag> GetAllJournalTagsByJournalId(int id);
    }
}
