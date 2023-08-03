using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Reflect.Models;
using Reflect.Utils;
using Microsoft.Extensions.Hosting;
using Reflect.Repositories;

namespace Reflect.Repositories
{
    public class ResearchTopicRepository : BaseRepository, IResearchTopicRepository
    {
        public ResearchTopicRepository(IConfiguration configuration) : base(configuration) { }

        public List<ResearchTopic> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, UserProfileId, FolderTitle, Note, Link, DateCreated
                            FROM ResearchTopic
                        ORDER BY DateCreated"
                    ;

                    var reader = cmd.ExecuteReader();

                    var researchTopics = new List<ResearchTopic>();
                    while (reader.Read())
                    {
                        researchTopics.Add(new ResearchTopic()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            FolderTitle = DbUtils.GetString(reader, "FolderTitle"),
                            Note = DbUtils.GetString(reader, "Note"),
                            Link = DbUtils.GetString(reader, "Link"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                        }
                        );
                    }

                    reader.Close();

                    return researchTopics;
                }
            }
        }
    }
}
