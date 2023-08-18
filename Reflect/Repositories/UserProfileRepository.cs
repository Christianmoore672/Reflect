using Reflect.Models;
using Reflect.Repositories;
using Reflect.Utils;

namespace Reflect.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public List<UserProfile> GetAll()
        {
            List<UserProfile> userProfiles = new List<UserProfile>();

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT UserProfile.Id, UserProfile.Name, UserProfile.Email, UserProfile.ImageUrl
                          FROM UserProfile";

                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            UserProfile userProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Email = DbUtils.GetString(reader, "Email"),
                                ImageUrl = DbUtils.GetString(reader, "ImageUrl"),

                            };

                            userProfiles.Add(userProfile);
                        }
                    }
                }
            }

            return userProfiles;
        }

        public UserProfile GetById(int id)
        {
            UserProfile userProfile = null;

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT UserProfile.Id, UserProfile.Name, UserProfile.Email, UserProfile.ImageUrl
                          FROM UserProfile
                        WHERE UserProfile.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            userProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Email = DbUtils.GetString(reader, "Email"),
                                ImageUrl = DbUtils.GetString(reader, "ImageUrl"),

                            };
                        }
                    }
                }
            }

            return userProfile;
        }
        public UserProfile GetByEmail(string email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT UserProfile.Id, UserProfile.Name, UserProfile.Email, UserProfile.ImageUrl
                          FROM UserProfile
                         WHERE Email = @email";

                    DbUtils.AddParameter(cmd, "@email", email);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email"),
                            ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                           
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FirstName, LastName, DisplayName, 
                                                                 Email, CreateDateTime, ImageLocation, UserTypeId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Name, @Email, @ImageUrl)";
                    DbUtils.AddParameter(cmd, "@Name", userProfile.Name);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@ImageUrl", userProfile.ImageUrl);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void UpdateProfileImage(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE UserProfile
                       SET
                        [ImageUrl] = @imageUrl
                        WHERE Id = @Id
                        ";
                    cmd.Parameters.AddWithValue("@Id", userProfile.Id);
                    cmd.Parameters.AddWithValue("@imageUrl", userProfile.ImageUrl);

                    cmd.ExecuteNonQuery();
                }

            }
        }
    }
}
