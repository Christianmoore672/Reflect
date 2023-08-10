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

        public List<ResearchTopic> GetAllResearchTopics()
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
        public List<ResearchTopic> GetResearchByUserProfileId(int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT r.Id, r.UserProfileId, r.FolderTitle, r.Note, r.Link, r.DateCreated,
                               u.Name, u.Email, u.ImageUrl
                        FROM ResearchTopic r
                            LEFT JOIN UserProfile u ON r.UserProfileId = u.Id
                        ORDER BY DateCreated"
                ;
                    cmd.Parameters.AddWithValue("@userProfileId", userProfileId);
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
        public ResearchTopic GetResearchTopicById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT r.Id, r.UserProfileId, r.FolderTitle, r.Note, r.Link, r.DateCreated,
                               u.Name, u.Email, u.ImageUrl
                        FROM ResearchTopic r
                            LEFT JOIN UserProfile u ON r.UserProfileId = u.Id
                        WHERE r.id = @id"
                ;

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    ResearchTopic researchTopic = null;

                    if (reader.Read())
                    {
                        researchTopic = new ResearchTopic()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            FolderTitle = DbUtils.GetString(reader, "FolderTitle"),
                            Note = DbUtils.GetString(reader, "Note"),
                            Link = DbUtils.GetString(reader, "Link"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),

                        };

                    }

                    reader.Close();

                    return researchTopic;
                }
            }
        }
        public void Add(ResearchTopic researchTopic)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO ResearchTopic (
                            FolderTitle, UserProfileId, Note, Link, DateCreated)
                        OUTPUT INSERTED.ID
                        VALUES (
                            @FolderTitle,@UserProfileId, @Note, @Link, @DateCreated)";
                    cmd.Parameters.AddWithValue("@FolderTitle", researchTopic.FolderTitle);
                    cmd.Parameters.AddWithValue("@UserProfileId", researchTopic.UserProfileId);
                    cmd.Parameters.AddWithValue("@Note", researchTopic.Note);
                    cmd.Parameters.AddWithValue("@Link", researchTopic.Link);
                    cmd.Parameters.AddWithValue("@DateCreated", researchTopic.DateCreated);

                    researchTopic.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM ResearchTopic WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(ResearchTopic researchTopic)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE ResearchTopic
                           SET FolderTitle = @FolderTitle,
                               UserProfileId = @UserProfileId,
                               Note = @Note,
                               Link = @Link,
                               DateCreated = @DateCreated

                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@FolderTitle", researchTopic.FolderTitle);
                    DbUtils.AddParameter(cmd, "@UserProfileId", researchTopic.UserProfileId);
                    DbUtils.AddParameter(cmd, "@Note", researchTopic.Note);
                    DbUtils.AddParameter(cmd, "@Link", researchTopic.Link);
                    DbUtils.AddParameter(cmd, "@DateCreated", researchTopic.DateCreated);
                    DbUtils.AddParameter(cmd, "@Id", researchTopic.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
