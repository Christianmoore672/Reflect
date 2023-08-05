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
    public class JournalRepository : BaseRepository, IJournalRepository
    {
        public JournalRepository(IConfiguration configuration) : base(configuration) { }

        private Journal NewJournalFromReader(SqlDataReader reader)
        {
            return new Journal()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Title = reader.GetString(reader.GetOrdinal("Title")),
                Description = reader.GetString(reader.GetOrdinal("Description")),
                Content = reader.GetString(reader.GetOrdinal("Content")),
                DateCreated = reader.GetDateTime(reader.GetOrdinal("DateCreated")),
                UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                UserProfile = new UserProfile()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                    Name = reader.GetString(reader.GetOrdinal("Name")),
                    Email = reader.GetString(reader.GetOrdinal("Email")),
                    ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                }
            };
        }
        public List<Journal> GetAllJournals()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using var cmd = conn.CreateCommand();
                cmd.CommandText = @"
                        SELECT j.Id, j.Title, j.Description, j.Content, j.DateCreated, j.UserProfileId,
                               u.Name, u.Email, u.ImageUrl
                        FROM Journal j
                            LEFT JOIN UserProfile u ON j.UserProfileId = u.Id
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
        public List<Journal> GetJournalsByUserProfileId(int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT j.Id, j.Title, j.Description, j.Content, j.DateCreated, j.UserProfileId,
                               u.Name, u.Email, u.ImageUrl
                        FROM Journal j
                            LEFT JOIN UserProfile u ON j.UserProfileId = u.Id
                        ORDER BY DateCreated"
                ;
                    cmd.Parameters.AddWithValue("@userProfileId", userProfileId);
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
        public Journal GetJournalById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT j.Id, j.Title, j.Description, j.Content, j.DateCreated, j.UserProfileId,
                               u.Name, u.Email, u.ImageUrl
                        FROM Journal j
                            LEFT JOIN UserProfile u ON j.UserProfileId = u.Id
                        ORDER BY DateCreated"
                ;

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    Journal journal = null;

                    if (reader.Read())
                    {
                        journal = new Journal();
           
                    }

                    reader.Close();

                    return journal;
                }
            }
        }
        public void Add(Journal journal)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Journal (
                            Title, Description, Content, DateCreated,
                            UserProfileId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Title, @Description, @Content, @DateCreated,
                            @UserProfileId )";
                    cmd.Parameters.AddWithValue("@Title", journal.Title);
                    cmd.Parameters.AddWithValue("@Description", journal.Description);
                    cmd.Parameters.AddWithValue("@Content", journal.Content);
                    cmd.Parameters.AddWithValue("@DateCreated", journal.DateCreated);
                    cmd.Parameters.AddWithValue("@UserProfileId", journal.UserProfileId);

                    journal.Id = (int)cmd.ExecuteScalar();
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
                    cmd.CommandText = "DELETE FROM Journal WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(Journal journal)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Journal
                           SET Title = @Title,
                               Description = @Description,
                               Content = @Content,
                               UserProfileId = @UserProfileId,
                               DateCreated = @DateCreated

                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Title", journal.Title);
                    DbUtils.AddParameter(cmd, "@Description", journal.Content);
                    DbUtils.AddParameter(cmd, "@Content", journal.Content);
                    DbUtils.AddParameter(cmd, "@UserProfileId", journal.UserProfileId);
                    DbUtils.AddParameter(cmd, "@DateCreated", journal.DateCreated);
                    DbUtils.AddParameter(cmd, "@Id", journal.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
