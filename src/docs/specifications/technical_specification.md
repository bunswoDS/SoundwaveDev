# SoundWave App Technical Specification

## 1. Introduction

### 1.1 Purpose
This document provides a detailed technical specification for the SoundWave application, a sound-based game that will be available on mobile phones, tablets, and web browsers.

### 1.2 Scope
The specification covers the architecture, technology stack, database design, user interface, deployment strategy, and integration requirements for the SoundWave application.

### 1.3 Definitions and Acronyms
- **CMS**: Content Management System
- **CRUD**: Create, Read, Update, Delete
- **UI**: User Interface
- **API**: Application Programming Interface
- **SQLite**: A C-language library that implements a small, fast, self-contained SQL database engine
- **Prisma**: Next-generation ORM for Node.js and TypeScript

## 2. System Architecture

### 2.1 High-Level Architecture
The SoundWave application will follow a hybrid architecture:
1. **Web Application**: React Native Web application with CMS functionality
2. **Mobile Applications**: Native iOS and Android applications generated from the web application

```
┌─────────────────────────────────────┐
│           Web Application           │
│  ┌─────────────┐    ┌─────────────┐ │
│  │    Game     │    │     CMS     │ │
│  │  Interface  │    │  Interface  │ │
│  └─────────────┘    └─────────────┘ │
└─────────────────────────────────────┘
             ▲                ▼
             │    ┌─────────────────┐
             │    │   Database      │
             │    │  (SQLite/PG)    │
             │    └─────────────────┘
             │                ▼
┌─────────────────────────────────────┐
│         Static App Generator        │
└─────────────────────────────────────┘
             ▼                ▼
┌─────────────┐      ┌─────────────────┐
│ iOS App     │      │   Android App   │
│ (SQLite)    │      │    (SQLite)     │
└─────────────┘      └─────────────────┘
```

### 2.2 Component Architecture

#### 2.2.1 Frontend Components
- **Game Interface**: React Native Web components for the game UI
- **CMS Interface**: React Native Web components for content management
- **Authentication**: User authentication for CMS access
- **Localization**: Multi-language support system
- **Audio Player**: Component for playing sound files
- **Settings Manager**: Component for managing user preferences

#### 2.2.2 Backend Components
- **API Layer**: RESTful API for data access
- **Database Access Layer**: Prisma ORM for database operations
- **Authentication Service**: User authentication and authorization
- **Content Management Service**: CRUD operations for game content
- **Static App Generator**: Service to generate static app versions
- **Eleven Labs Integration**: Service for generating verbal answers

## 3. Technology Stack

### 3.1 Frontend
- **Framework**: React Native Web
- **Language**: TypeScript
- **State Management**: React Context API or Redux
- **UI Components**: Custom components styled for cross-platform compatibility
- **Audio**: React Native Sound or Howler.js
- **Localization**: i18next or similar

### 3.2 Backend
- **API Framework**: Express.js or similar
- **Database ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Local file system with proper organization

### 3.3 Database
- **Mobile/Offline**: SQLite
- **Web/Online**: SQLite or PostgreSQL (based on scaling needs)
- **Schema Management**: Prisma schema

### 3.4 Development Tools
- **Version Control**: Git
- **Package Management**: npm, yarn, or pnpm
- **Build Tools**: Metro (React Native), Webpack
- **Testing**: Jest, React Testing Library

### 3.5 Deployment
- **Web Hosting**: Vercel, Netlify, or similar
- **Mobile Deployment**: App Store (iOS), Google Play Store (Android)
- **CI/CD**: GitHub Actions or similar

## 4. Database Design

### 4.1 Entity Relationship Diagram

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
```

### 4.2 Table Definitions

#### 4.2.1 Category
- `id`: Primary key
- `name`: Category name
- `imageNormal`: URL/path to normal state image
- `imageHover`: URL/path to hover state image
- `imageClick`: URL/path to click state image
- `languageId`: Foreign key to Language table

#### 4.2.2 Sound
- `id`: Primary key
- `categoryId`: Foreign key to Category table
- `fileName`: Name of the sound file
- `filePath`: Path to the sound file
- `languageId`: Foreign key to Language table
- `textAnswer`: Text answer for the sound
- `answerFileName`: Name of the verbal answer file
- `answerFilePath`: Path to the verbal answer file

#### 4.2.3 Language
- `id`: Primary key
- `code`: Language code (e.g., 'en', 'fr', 'es')
- `name`: Language name

#### 4.2.4 Settings
- `id`: Primary key
- `maxReplays`: Maximum number of replays allowed (null for infinite)
- `languageId`: Foreign key to Language table

#### 4.2.5 User
- `id`: Primary key
- `username`: Username for CMS login
- `password`: Hashed password
- `role`: User role (admin, editor, etc.)

### 4.3 Localization Schema
Localization will be implemented using JSON files with the following structure:

```json
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
```

## 5. API Endpoints

### 5.1 Authentication
- `POST /api/auth/login`: User login
- `POST /api/auth/logout`: User logout

### 5.2 Categories
- `GET /api/categories`: Get all categories
- `GET /api/categories/:id`: Get category by ID
- `POST /api/categories`: Create new category
- `PUT /api/categories/:id`: Update category
- `DELETE /api/categories/:id`: Delete category

### 5.3 Sounds
- `GET /api/sounds`: Get all sounds
- `GET /api/sounds/:id`: Get sound by ID
- `GET /api/sounds/category/:categoryId`: Get sounds by category
- `POST /api/sounds`: Create new sound
- `PUT /api/sounds/:id`: Update sound
- `DELETE /api/sounds/:id`: Delete sound
- `POST /api/sounds/:id/generate-answer`: Generate verbal answer using Eleven Labs

### 5.4 Languages
- `GET /api/languages`: Get all languages
- `GET /api/languages/:id`: Get language by ID
- `POST /api/languages`: Create new language
- `PUT /api/languages/:id`: Update language
- `DELETE /api/languages/:id`: Delete language

### 5.5 Settings
- `GET /api/settings`: Get settings
- `PUT /api/settings`: Update settings

### 5.6 Users
- `GET /api/users`: Get all users
- `GET /api/users/:id`: Get user by ID
- `POST /api/users`: Create new user
- `PUT /api/users/:id`: Update user
- `DELETE /api/users/:id`: Delete user

### 5.7 Static App Generation
- `POST /api/generate/ios`: Generate static iOS app
- `POST /api/generate/android`: Generate static Android app

## 6. User Interface Design

### 6.1 App Pages

#### 6.1.1 Intro/Loading Page
- App logo centered
- Loading animation
- Progress indicator
- Background matching app theme

#### 6.1.2 Main Game Screen
```
┌─────────────────────────────────────┐
│              LOGO                   │
├─────────────────────────────────────┤
│                                     │
│         [Text Answer Area]          │
│                                     │
├─────────────────────────────────────┤
│                                     │
│    [Games]        [Animals]         │
│                                     │
│                                     │
│ [Industrial]    [Environment]       │
│                                     │
│                                     │
│ [Home/Office]     [Music]           │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  [Replay]  [Replay Count]  [Reveal] │
│                                     │
│              [Settings]             │
└─────────────────────────────────────┘
```

#### 6.1.3 Settings Screen
```
┌─────────────────────────────────────┐
│              SETTINGS               │
├─────────────────────────────────────┤
│                                     │
│  Maximum Replays:                   │
│  [Dropdown: 1, 2, 3, 5, 10, ∞]      │
│                                     │
│  Language:                          │
│  [Dropdown: English, French, ...]   │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│  [Save]              [Cancel]       │
│                                     │
└─────────────────────────────────────┘
```

### 6.2 CMS Pages

#### 6.2.1 Login Screen
Standard login form with username and password fields.

#### 6.2.2 Dashboard
Overview of content statistics and quick access to main sections.

#### 6.2.3 Categories Management
List view with CRUD operations for categories.

#### 6.2.4 Sounds Management
List view with filtering by category and CRUD operations for sounds.

#### 6.2.5 Languages Management
List view with CRUD operations for languages and localization file upload.

#### 6.2.6 User Management
Admin-only section for managing CMS users.

#### 6.2.7 App Generation
Interface for generating static app versions for iOS and Android.

## 7. Offline Functionality

### 7.1 Data Synchronization
The static app generation process will:
1. Export all necessary sound files
2. Export all necessary image files
3. Create a SQLite database with all required data
4. Package everything into the app bundle

### 7.2 Local Storage
The mobile apps will use:
- SQLite for structured data
- Local file system for media files

## 8. Deployment Strategy

### 8.1 Web Deployment
1. Deploy React Native Web application to a web hosting service
2. Set up proper CORS and security configurations
3. Configure database connection

### 8.2 Mobile Deployment

#### 8.2.1 iOS Deployment
1. Generate static app version from CMS
2. Open in Xcode
3. Configure app signing and capabilities
4. Build and archive
5. Submit to App Store

#### 8.2.2 Android Deployment
1. Generate static app version from CMS
2. Open in Android Studio
3. Configure app signing
4. Build release APK or App Bundle
5. Submit to Google Play Store

## 9. Integration Requirements

### 9.1 Eleven Labs Integration
The CMS will integrate with Eleven Labs API to generate verbal answers:
1. When a new sound is created or updated
2. The text answer is sent to Eleven Labs API
3. The generated audio file is saved and linked to the sound

### 9.2 Integration Flow
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  CMS Form   │───►│ Server API  │───►│ Eleven Labs │
│  (Submit)   │    │ (Process)   │    │     API     │
└─────────────┘    └─────────────┘    └─────────────┘
                          │                  │
                          ▼                  ▼
                   ┌─────────────┐    ┌─────────────┐
                   │  Save Text  │◄───┤ Save Audio  │
                   │   Answer    │    │    File     │
                   └─────────────┘    └─────────────┘
```

## 10. Security Considerations

### 10.1 Authentication
- JWT-based authentication for CMS
- Secure password storage with bcrypt or similar
- Role-based access control

### 10.2 Data Protection
- HTTPS for all API communications
- Input validation and sanitization
- Protection against common web vulnerabilities (XSS, CSRF, etc.)

### 10.3 File Security
- Validation of uploaded files
- Secure file storage
- Proper file access controls

## 11. Performance Considerations

### 11.1 Asset Optimization
- Compression of audio files
- Optimization of image assets
- Lazy loading of media files

### 11.2 Database Optimization
- Proper indexing
- Query optimization
- Connection pooling

### 11.3 Mobile Performance
- Minimize app size
- Optimize startup time
- Efficient resource usage

## 12. Testing Strategy

### 12.1 Unit Testing
- Component testing
- Service testing
- Utility function testing

### 12.2 Integration Testing
- API endpoint testing
- Database interaction testing
- Third-party integration testing

### 12.3 UI Testing
- Component rendering
- User interaction flows
- Cross-platform compatibility

### 12.4 Performance Testing
- Load testing
- Response time testing
- Resource usage monitoring

## 13. Maintenance and Support

### 13.1 Monitoring
- Error logging and tracking
- Performance monitoring
- Usage analytics

### 13.2 Updates
- Regular security updates
- Feature enhancements
- Bug fixes

### 13.3 Backup and Recovery
- Regular database backups
- File system backups
- Disaster recovery plan

## 14. Future Enhancements

### 14.1 Additional Languages
- Support for Spanish and other languages
- Improved localization workflow

### 14.2 Enhanced Game Features
- Scoring system
- Multiplayer mode
- Difficulty levels

### 14.3 Advanced CMS Features
- Batch operations
- Advanced analytics
- Enhanced media management

## 15. Conclusion
This technical specification provides a comprehensive guide for the development of the SoundWave application. It covers all aspects of the system architecture, technology stack, database design, user interface, deployment strategy, and integration requirements. Following this specification will ensure the successful implementation of the application according to the requirements.
