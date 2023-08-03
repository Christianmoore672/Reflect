USE [master]

IF db_id('Reflect') IS NULl
  CREATE DATABASE [Reflect]
GO

USE [Reflect]
GO


DROP TABLE IF EXISTS [ResearchTopic];
DROP TABLE IF EXISTS [Tag];
DROP TABLE IF EXISTS [Journal];
DROP TABLE IF EXISTS [UserProfile];

CREATE TABLE [Journal] (
  [Id] integer PRIMARY KEY IDENTITY NOT NULL,
  [Title] nvarchar(255) NOT NULL,
  [Description] nvarchar(255) NOT NULL,
  [Content] nvarchar(255),
  [UserProfileId] integer NOT NULL,
  [DateCreated] datetime
)
GO

CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [ImageUrl] nvarchar(255),
)
GO


CREATE TABLE [ResearchTopic] (
  [Id] integer PRIMARY KEY IDENTITY,
  [UserProfileId] integer NOT NULL,
  [FolderTitle] nvarchar(255) NOT NULL,
  [Note] text NOT NULL,
  [Link] nvarchar(255),
  [DateCreated] datetime NOT NULL,
)
GO


CREATE TABLE [Tag] (
  [Id] integer PRIMARY KEY IDENTITY,
  [JournalId] integer NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [UserProfileId] integer NOT NULL,
)
GO

ALTER TABLE [Journal] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Tag] ADD FOREIGN KEY ([JournalId]) REFERENCES [Journal] ([Id])
GO

ALTER TABLE [ResearchTopic] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Tag] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile]
  ([Id], [Name], [Email], [ImageUrl])
VALUES 
  (1, 'Christian Moore', 'christianmoore@email.com', null);
INSERT INTO [UserProfile]
  ([Id], [Name], [Email], [ImageUrl])
VALUES 
  (2, 'Stan Laurel', 'stan@email.com', null);
SET IDENTITY_INSERT [UserProfile] OFF

SET IDENTITY_INSERT [Journal] ON
INSERT INTO [Journal]
  ([Id], [Title], [Description], [Content], [UserProfileId], [DateCreated])
VALUES
  (1, 'Test Journal', 'This is a Test', null, 1, '07-28-2023');
SET IDENTITY_INSERT [Journal] OFF

SET IDENTITY_INSERT [Tag] ON
INSERT INTO [Tag]
  ([Id], [JournalId], [Name], [UserProfileId])
VALUES
  (1, 1, 'Testing', 1);
SET IDENTITY_INSERT [Tag] OFF

SET IDENTITY_INSERT [ResearchTopic] ON
INSERT INTO [ResearchTopic]
  ([Id],  [UserProfileId], [FolderTitle], [Note], [Link], [DateCreated])
VALUES
  (1, 1, 'Tests', 'testing stuff', 'https://media.giphy.com/media/j609LflrIXInkLNMts/giphy.gif', '07-28-2023');
SET IDENTITY_INSERT [ResearchTopic] OFF
