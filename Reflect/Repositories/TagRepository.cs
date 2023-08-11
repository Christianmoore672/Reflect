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
    public class TagRepository : BaseRepository, ITagRepository
    {
        public TagRepository(IConfiguration configuration) : base(configuration) { }

        public List<Tag> GetAllTags()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, Name, UserProfileId
                            FROM Tag
                        ORDER BY Name"
                    ;

                    var reader = cmd.ExecuteReader();

                    var tags = new List<Tag>();
                    while (reader.Read())
                    {
                        tags.Add(new Tag()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                        }
                        );
                    }

                    reader.Close();

                    return tags;
                }
            }
        }

        public List<Tag> GetTagsByUserProfileId(int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT t.Id, t.Name, t.UserProfileId,
                               u.Name, u.Email, u.ImageUrl
                        FROM Tag t
                            LEFT JOIN UserProfile u ON t.UserProfileId = u.Id
                        "
                ;
                    cmd.Parameters.AddWithValue("@userProfileId", userProfileId);
                    var reader = cmd.ExecuteReader();

                    var tags = new List<Tag>();

                    while (reader.Read())
                    {
                        tags.Add(new Tag()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                        }
                        );
                    }

                    reader.Close();

                    return tags;
                }
            }
        }
        public Tag GetTagById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT t.Id, t.Name, t.UserProfileId,
                               u.Name, u.Email, u.ImageUrl
                        FROM Tag t
                            LEFT JOIN UserProfile u ON t.UserProfileId = u.Id
                       WHERE t.id = @id;"
                ;

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    Tag tag = null;

                    if (reader.Read())
                    {
                        tag = new Tag()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),

                        };

                    }

                    reader.Close();

                    return tag;
                }
            }
        }
        public void Add(Tag tag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Tag (
                            Name, UserProfileId )
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @UserProfileId )";

                    cmd.Parameters.AddWithValue("@Name", tag.Name);
                    cmd.Parameters.AddWithValue("@UserProfileId", tag.UserProfileId);

                    tag.Id = (int)cmd.ExecuteScalar();
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
                    cmd.CommandText = "DELETE FROM Tag WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(Tag tag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Tag
                           SET Name = @Name,
                               UserProfileId = @UserProfileId

                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Name", tag.Name);
                    DbUtils.AddParameter(cmd, "@UserProfileId", tag.UserProfileId);
                    DbUtils.AddParameter(cmd, "@Id", tag.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}