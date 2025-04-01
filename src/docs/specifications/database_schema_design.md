# SoundWave App - Database Schema Design

## Overview

This document details the database schema design for the SoundWave application. The schema is designed to work with SQLite for local storage on mobile devices while being compatible with potential PostgreSQL implementation for the web CMS. The schema is implemented using Prisma ORM to manage database types and operations.

## Database Technology Considerations

### Local Storage (Mobile Apps)
- **Database Engine**: SQLite
- **ORM**: Prisma
- **Purpose**: Provide offline access to all game content

### Web CMS (Optional Alternative)
- **Database Engine**: PostgreSQL (optional alternative to SQLite)
- **ORM**: Prisma
- **Purpose**: Content management and administration

## Schema Definition (Prisma Format)

```prisma
// This is the Prisma schema file for the SoundWave application
// It defines the data model for both SQLite (mobile) and potential PostgreSQL (web) implementations

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite" // Can be changed to "postgresql" for web CMS if needed
  url      = env("DATABASE_URL")
}

// User model for CMS authentication and authorization
model User {
  id        String   @id @default(uuid())
  username  String   @unique
  password  String   // Hashed password
  role      String   // "admin", "editor", etc.
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// Language model for localization
model Language {
  id         String     @id @default(uuid())
  code       String     @unique // e.g., "en", "fr", "es"
  name       String     // e.g., "English", "French", "Spanish"
  isActive   Boolean    @default(true)
  createdAt  DateTime   @default(now())
  updatedAt  DateTime   @updatedAt
  
  // Relations
  categories Category[]
  sounds     Sound[]
  settings   Settings?
  
  // Localization entries stored as JSON in SQLite
  // For PostgreSQL, this could be a separate table
  localizationData String? // JSON string containing localization key-value pairs
}

// Category model for sound categories
model Category {
  id          String   @id @default(uuid())
  name        String
  imageNormal String   // URL/path to normal state image
  imageHover  String   // URL/path to hover state image
  imageClick  String   // URL/path to click state image
  languageId  String
  language    Language @relation(fields: [languageId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relations
  sounds      Sound[]
  
  // Composite unique constraint
  @@unique([name, languageId])
}

// Sound model for sound files
model Sound {
  id             String   @id @default(uuid())
  fileName       String   // Name of the sound file
  filePath       String   // Path to the sound file
  textAnswer     String   // Text answer for the sound
  answerFileName String?  // Name of the verbal answer file
  answerFilePath String?  // Path to the verbal answer file
  categoryId     String
  category       Category @relation(fields: [categoryId], references: [id])
  languageId     String
  language       Language @relation(fields: [languageId], references: [id])
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  
  // Composite unique constraint
  @@unique([fileName, languageId])
}

// Settings model for app configuration
model Settings {
  id         String    @id @default(uuid())
  maxReplays Int?      // null means infinite
  languageId String    @unique
  language   Language  @relation(fields: [languageId], references: [id])
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt
}

// AppVersion model for tracking published versions
model AppVersion {
  id           String   @id @default(uuid())
  versionName  String   @unique // e.g., "1.0.0"
  versionCode  Int      // Incremental version code
  platform     String   // "ios", "android", "web"
  buildPath    String?  // Path to the build files
  publishedAt  DateTime @default(now())
  notes        String?  // Release notes
}
```

## Entity Relationship Diagram

```
┌───────────────┐       ┌───────────────┐
│   Category    │       │     Sound     │
├───────────────┤       ├───────────────┤
│ id            │◄──────┤ categoryId    │
│ name          │       │ id            │
│ imageNormal   │       │ fileName      │
│ imageHover    │       │ filePath      │
│ imageClick    │       │ languageId    │
│ languageId    │       │ textAnswer    │
└───────┬───────┘       │ answerFileName│
        │               │ answerFilePath│
        │               └───────┬───────┘
        │                       │
        │                       │
        ▼                       ▼
┌───────────────┐       ┌───────────────┐
│   Language    │       │    Settings   │
├───────────────┤       ├───────────────┤
│ id            │◄──────┤ languageId    │
│ code          │       │ id            │
│ name          │       │ maxReplays    │
│ isActive      │       └───────────────┘
│ localizationData      │
└───────────────┘

┌───────────────┐       ┌───────────────┐
│     User      │       │  AppVersion   │
├───────────────┤       ├───────────────┤
│ id            │       │ id            │
│ username      │       │ versionName   │
│ password      │       │ versionCode   │
│ role          │       │ platform      │
└───────────────┘       │ buildPath     │
                        │ publishedAt   │
                        │ notes         │
                        └───────────────┘
```

## Model Descriptions

### User
Stores information about CMS users who can manage content.
- **id**: Unique identifier (UUID)
- **username**: Unique username for login
- **password**: Hashed password for authentication
- **role**: User role for authorization (admin, editor, etc.)
- **createdAt**: Timestamp of user creation
- **updatedAt**: Timestamp of last update

### Language
Stores information about supported languages for localization.
- **id**: Unique identifier (UUID)
- **code**: Unique language code (e.g., "en", "fr", "es")
- **name**: Language name (e.g., "English", "French", "Spanish")
- **isActive**: Whether the language is active in the app
- **localizationData**: JSON string containing localization key-value pairs
- **createdAt**: Timestamp of language creation
- **updatedAt**: Timestamp of last update

### Category
Stores information about sound categories.
- **id**: Unique identifier (UUID)
- **name**: Category name
- **imageNormal**: URL/path to normal state image
- **imageHover**: URL/path to hover state image
- **imageClick**: URL/path to click state image
- **languageId**: Foreign key to Language
- **createdAt**: Timestamp of category creation
- **updatedAt**: Timestamp of last update

### Sound
Stores information about sound files.
- **id**: Unique identifier (UUID)
- **fileName**: Name of the sound file
- **filePath**: Path to the sound file
- **textAnswer**: Text answer for the sound
- **answerFileName**: Name of the verbal answer file
- **answerFilePath**: Path to the verbal answer file
- **categoryId**: Foreign key to Category
- **languageId**: Foreign key to Language
- **createdAt**: Timestamp of sound creation
- **updatedAt**: Timestamp of last update

### Settings
Stores application settings.
- **id**: Unique identifier (UUID)
- **maxReplays**: Maximum number of replays allowed (null for infinite)
- **languageId**: Foreign key to Language
- **createdAt**: Timestamp of settings creation
- **updatedAt**: Timestamp of last update

### AppVersion
Stores information about published app versions.
- **id**: Unique identifier (UUID)
- **versionName**: Semantic version name (e.g., "1.0.0")
- **versionCode**: Incremental version code
- **platform**: Target platform (ios, android, web)
- **buildPath**: Path to the build files
- **publishedAt**: Timestamp of publication
- **notes**: Release notes

## Data Relationships

1. **Language to Category**: One-to-Many
   - A language can have multiple categories
   - Each category belongs to one language

2. **Language to Sound**: One-to-Many
   - A language can have multiple sounds
   - Each sound belongs to one language

3. **Language to Settings**: One-to-One
   - A language can have one settings record
   - Each settings record belongs to one language

4. **Category to Sound**: One-to-Many
   - A category can have multiple sounds
   - Each sound belongs to one category

## Localization Implementation

The localization data is stored in the `Language` model as a JSON string in the `localizationData` field. This approach works well for SQLite, which doesn't have native JSON support but can store the data as a string.

Example localization data structure:

```json
{
  "app.title": "SoundWave",
  "button.replay": "Replay",
  "button.reveal": "Reveal",
  "settings.title": "Settings",
  "settings.maxReplays": "Maximum Replays",
  "settings.language": "Language",
  "category.games": "Games",
  "category.animals": "Animals",
  "category.industrial": "Industrial",
  "category.environment": "Environment",
  "category.homeOffice": "Home & Office",
  "category.music": "Music"
}
```

For PostgreSQL implementation, this could be moved to a separate table with a more normalized structure if needed.

## Static App Generation Considerations

When generating static app versions for offline use:

1. The database schema will be exported as a SQLite database file
2. All media files (sounds, images, verbal answers) will be included in the app bundle
3. The app will use the local SQLite database for all data access
4. The database will be pre-populated with all necessary data during the build process

## Migration Strategy

For database schema updates:

1. Use Prisma migrations to manage schema changes
2. Implement version checking in the app to handle database upgrades
3. Include migration scripts in the static app generation process
4. Ensure backward compatibility for critical data structures

## Performance Considerations

1. **Indexing**: The schema includes appropriate indexes for foreign keys and unique constraints
2. **Query Optimization**: The schema is designed to support efficient queries for common operations
3. **Data Volume**: The schema can handle a reasonable number of sounds and categories
4. **File Storage**: Media files are referenced by path rather than stored in the database

## Security Considerations

1. **Authentication**: User passwords are stored as hashed values
2. **Authorization**: User roles control access to CMS features
3. **Data Validation**: All data should be validated before storage
4. **File Access**: File paths should be validated to prevent directory traversal attacks

## Conclusion

This database schema design provides a solid foundation for the SoundWave application. It supports all the required functionality while being compatible with both SQLite for mobile apps and potentially PostgreSQL for the web CMS. The use of Prisma ORM ensures type safety and efficient database operations across all platforms.
