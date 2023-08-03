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
    public class JournalRepository : BaseRepository, IJournalRepository
    {
        public JournalRepository(IConfiguration configuration) : base(configuration) { }

        public List<Journal> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, Title, Description, Content, UserProfileId, DateCreated
                            FROM Journal
                        ORDER BY DateCreated"
                    ;

                    var reader = cmd.ExecuteReader();

                    var journals = new List<Journal>();
                    while (reader.Read())
                    {
                        journals.Add(new Journal()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Description = DbUtils.GetString(reader, "Description"),
                            Content = DbUtils.GetString(reader, "Content"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                        }
                        );
                    }

                    reader.Close();

                    return journals;
                }
            }
        }

        public Journal GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Title, Description, Content, UserProfileId, DateCreated
                            FROM Journal
                           WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Journal journal = null;
                    if (reader.Read())
                    {
                        journal = new Journal()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Description = DbUtils.GetString(reader, "Description"),
                            Content = DbUtils.GetString(reader, "Content"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                        };
                    }

                    reader.Close();

                    return journal;
                }
            }
        }
    }
}
