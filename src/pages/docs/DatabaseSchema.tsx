import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

const DatabaseSchema: React.FC = () => {
  const [content, setContent] = useState<string>('Loading database schema...');

  useEffect(() => {
    // In a real implementation, this would fetch the content from the server
    // For now, we'll use the content from the database_schema_design.md file
    fetch('/database_schema_design.md')
      .then(response => response.text())
      .then(text => setContent(text))
      .catch(error => {
        console.error('Error loading database schema:', error);
        // Fallback to hardcoded content if fetch fails
        setContent(`
# SoundWave App - Database Schema Design

## 1. Overview

This document outlines the database schema design for the SoundWave application. The schema is designed to support both the web-based content management system (CMS) and the offline mobile applications.

## 2. Database Technology

### 2.1 Mobile/Offline Database
- **Technology**: SQLite
- **Purpose**: Local storage for mobile applications
- **Characteristics**: Self-contained, serverless, zero-configuration

### 2.2 Web/Online Database
- **Technology**: SQLite or PostgreSQL (based on scaling needs)
- **Purpose**: Backend for web CMS
- **Characteristics**: Compatible with SQLite for static app generation

### 2.3 ORM
- **Technology**: Prisma
- **Purpose**: Database type management and query building
- **Characteristics**: Type-safe database client, schema migrations, data modeling

## 3. Entity Relationship Diagram

\`\`\`
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
│ id            │       │ id            │
│ code          │       │ maxReplays    │
│ name          │       │ languageId    │
└───────────────┘       └───────────────┘

┌───────────────┐
│     User      │
├───────────────┤
│ id            │
│ username      │
│ password      │
│ role          │
└───────────────┘
\`\`\`

## 4. Table Definitions

### 4.1 Category

| Field       | Type      | Description                           | Constraints           |
|-------------|-----------|---------------------------------------|------------------------|
| id          | Integer   | Primary key                           | NOT NULL, AUTO INCREMENT |
| name        | String    | Category name                         | NOT NULL               |
| imageNormal | String    | URL/path to normal state image        | NOT NULL               |
| imageHover  | String    | URL/path to hover state image         | NOT NULL               |
| imageClick  | String    | URL/path to click state image         | NOT NULL               |
| languageId  | Integer   | Foreign key to Language table         | NOT NULL               |
| createdAt   | DateTime  | Creation timestamp                    | NOT NULL, DEFAULT NOW  |
| updatedAt   | DateTime  | Last update timestamp                 | NOT NULL, DEFAULT NOW  |

### 4.2 Sound

| Field          | Type      | Description                           | Constraints           |
|----------------|-----------|---------------------------------------|------------------------|
| id             | Integer   | Primary key                           | NOT NULL, AUTO INCREMENT |
| categoryId     | Integer   | Foreign key to Category table         | NOT NULL               |
| fileName       | String    | Name of the sound file                | NOT NULL               |
| filePath       | String    | Path to the sound file                | NOT NULL               |
| languageId     | Integer   | Foreign key to Language table         | NOT NULL               |
| textAnswer     | String    | Text answer for the sound             | NOT NULL               |
| answerFileName | String    | Name of the verbal answer file        | NOT NULL               |
| answerFilePath | String    | Path to the verbal answer file        | NOT NULL               |
| createdAt      | DateTime  | Creation timestamp                    | NOT NULL, DEFAULT NOW  |
| updatedAt      | DateTime  | Last update timestamp                 | NOT NULL, DEFAULT NOW  |

### 4.3 Language

| Field     | Type      | Description                           | Constraints           |
|-----------|-----------|---------------------------------------|------------------------|
| id        | Integer   | Primary key                           | NOT NULL, AUTO INCREMENT |
| code      | String    | Language code (e.g., 'en', 'fr', 'es')| NOT NULL, UNIQUE      |
| name      | String    | Language name                         | NOT NULL               |
| createdAt | DateTime  | Creation timestamp                    | NOT NULL, DEFAULT NOW  |
| updatedAt | DateTime  | Last update timestamp                 | NOT NULL, DEFAULT NOW  |

### 4.4 Settings

| Field      | Type      | Description                           | Constraints           |
|------------|-----------|---------------------------------------|------------------------|
| id         | Integer   | Primary key                           | NOT NULL, AUTO INCREMENT |
| maxReplays | Integer   | Maximum number of replays allowed     | NULL for infinite      |
| languageId | Integer   | Foreign key to Language table         | NOT NULL               |
| createdAt  | DateTime  | Creation timestamp                    | NOT NULL, DEFAULT NOW  |
| updatedAt  | DateTime  | Last update timestamp                 | NOT NULL, DEFAULT NOW  |

### 4.5 User

| Field     | Type      | Description                           | Constraints           |
|-----------|-----------|---------------------------------------|------------------------|
| id        | Integer   | Primary key                           | NOT NULL, AUTO INCREMENT |
| username  | String    | Username for CMS login                | NOT NULL, UNIQUE      |
| password  | String    | Hashed password                       | NOT NULL               |
| role      | String    | User role (admin, editor, etc.)       | NOT NULL               |
| createdAt | DateTime  | Creation timestamp                    | NOT NULL, DEFAULT NOW  |
| updatedAt | DateTime  | Last update timestamp                 | NOT NULL, DEFAULT NOW  |

## 5. Relationships

### 5.1 Category to Sound
- One-to-many relationship
- A category can have multiple sounds
- Each sound belongs to exactly one category

### 5.2 Language to Category
- One-to-many relationship
- A language can have multiple categories
- Each category is associated with exactly one language

### 5.3 Language to Sound
- One-to-many relationship
- A language can have multiple sounds
- Each sound is associated with exactly one language

### 5.4 Language to Settings
- One-to-many relationship
- A language can be selected in multiple settings
- Each settings record is associated with exactly one language

## 6. Indexes

### 6.1 Category Table
- Primary key index on \`id\`
- Foreign key index on \`languageId\`

### 6.2 Sound Table
- Primary key index on \`id\`
- Foreign key index on \`categoryId\`
- Foreign key index on \`languageId\`

### 6.3 Language Table
- Primary key index on \`id\`
- Unique index on \`code\`

### 6.4 Settings Table
- Primary key index on \`id\`
- Foreign key index on \`languageId\`

### 6.5 User Table
- Primary key index on \`id\`
- Unique index on \`username\`

## 7. Prisma Schema

\`\`\`prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite" // or "postgresql" for web CMS
  url      = env("DATABASE_URL")
}

model Category {
  id          Int      @id @default(autoincrement())
  name        String
  imageNormal String
  imageHover  String
  imageClick  String
  language    Language @relation(fields: [languageId], references: [id])
  languageId  Int
  sounds      Sound[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Sound {
  id             Int      @id @default(autoincrement())
  fileName       String
  filePath       String
  textAnswer     String
  answerFileName String
  answerFilePath String
  category       Category @relation(fields: [categoryId], references: [id])
  categoryId     Int
  language       Language @relation(fields: [languageId], references: [id])
  languageId     Int
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

model Language {
  id        Int        @id @default(autoincrement())
  code      String     @unique
  name      String
  categories Category[]
  sounds     Sound[]
  settings   Settings[]
  createdAt  DateTime   @default(now())
  updatedAt  DateTime   @updatedAt
}

model Settings {
  id         Int       @id @default(autoincrement())
  maxReplays Int?      // null means infinite
  language   Language  @relation(fields: [languageId], references: [id])
  languageId Int
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt
}

model User {
  id        Int      @id @default(autoincrement())
  username  String   @unique
  password  String
  role      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
\`\`\`

## 8. Data Migration Strategy

### 8.1 Initial Setup
1. Define Prisma schema
2. Generate Prisma client
3. Create initial migration
4. Apply migration to create database tables

### 8.2 Schema Updates
1. Update Prisma schema
2. Generate new migration
3. Apply migration to update database structure

### 8.3 Static App Generation
1. Export data from web CMS database
2. Generate SQLite database for mobile apps
3. Package database with app bundle

## 9. Localization Schema

Localization will be implemented using JSON files with the following structure:

\`\`\`json
{
  "en": {
    "app.title": "SoundWave",
    "button.replay": "Replay",
    "button.reveal": "Reveal",
    "settings.title": "Settings",
    "settings.maxReplays": "Maximum Replays",
    "settings.language": "Language"
    // Additional keys
  },
  "fr": {
    "app.title": "SoundWave",
    "button.replay": "Rejouer",
    "button.reveal": "Révéler",
    "settings.title": "Paramètres",
    "settings.maxReplays": "Nombre maximum de répétitions",
    "settings.language": "Langue"
    // Additional keys
  }
}
\`\`\`

## 10. Conclusion

This database schema design provides a solid foundation for the SoundWave application. It supports all the required functionality while maintaining compatibility between the web CMS and mobile applications. The use of Prisma ensures type safety and simplifies database operations.
        `);
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <div className="prose prose-lg max-w-none">
          {content.split('\n').map((line, index) => {
            if (line.startsWith('# ')) {
              return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{line.substring(2)}</h1>;
            } else if (line.startsWith('## ')) {
              return <h2 key={index} className="text-2xl font-bold mt-6 mb-3">{line.substring(3)}</h2>;
            } else if (line.startsWith('### ')) {
              return <h3 key={index} className="text-xl font-bold mt-4 mb-2">{line.substring(4)}</h3>;
            } else if (line.startsWith('#### ')) {
              return <h4 key={index} className="text-lg font-bold mt-3 mb-2">{line.substring(5)}</h4>;
            } else if (line.startsWith('- ')) {
              return <li key={index} className="ml-6">{line.substring(2)}</li>;
            } else if (line.startsWith('| ')) {
              // Handle table rows
              return <div key={index} className="font-mono text-sm whitespace-pre overflow-x-auto">{line}</div>;
            } else if (line.startsWith('```')) {
              // Handle code blocks
              return <pre key={index} className="bg-gray-100 p-4 rounded overflow-x-auto"><code>{line.replace('```', '')}</code></pre>;
            } else if (line.trim() === '') {
              return <div key={index} className="h-4"></div>;
            } else {
              return <p key={index} className="my-2">{line}</p>;
            }
          })}
        </div>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
});

export default DatabaseSchema;
