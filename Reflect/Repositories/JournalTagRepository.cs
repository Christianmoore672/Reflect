using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Reflect.Models;
using Reflect.Utils;
using Microsoft.Extensions.Hosting;
using Reflect.Repositories;
using Microsoft.Data.SqlClient;

namespace Reflect.Repositories
{
    public class JournalTagRepository : BaseRepository, IJournalTagRepository
    {
        public JournalTagRepository(IConfiguration configuration) : base(configuration) { }
    
        public List<JournalTag> GetAllJournalTagsByJournalId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT jt.Id as JournalTagId, jt.JournalId, jt.TagId,\r\nj.id as JournalId\r\nFROM JournalTag jt\r\nLEFT JOIN Journal j on jt.JournalId = j.Id\r\nwhere j.id = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    List<JournalTag> journalTags = new List<JournalTag>();

                    while (reader.Read())
                    {
                        journalTags.Add(new JournalTag()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("JournalTagId")),
                            JournalId = reader.GetInt32(reader.GetOrdinal("JournalId")),
                            TagId = reader.GetInt32(reader.GetOrdinal("TagId")),


                        });
                    }
                    reader.Close();
                    return journalTags;
                }
            }
        }

        public void Add(JournalTag journalTag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO JournalTag (TagId, JournalId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @TagId, @JournalId )";
                    cmd.Parameters.AddWithValue("@TagId", journalTag.TagId);
                    cmd.Parameters.AddWithValue("@JournalId", journalTag.JournalId);

                    journalTag.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
