# SoundWave App Requirements Analysis

## Overview
SoundWave is a sound-based game application that will be available on:
- Mobile phones
- Tablets
- Web browsers

The app will use React Native Web to ensure cross-platform compatibility.

## Core Functionality

### Main Game Interface
- 6 main circular buttons for sound categories
- Random sound selection from library when category button is pressed
- Dedicated replay button
- Reveal button that plays audio revealing the sound name
- Text display of the answer
- Counter for number of replays
- Settings button

### Sound Categories
1. Games
2. Animals
3. Industrial
4. Environment
5. Home & Office
6. Music

### Settings Configuration
- Max number of replays or infinite option
- Language selection from available languages

### Localization
- Initial languages: English and French
- Future expansion to include Spanish
- Localization file format for easy addition of new languages

### Content Management
- Management of sound files:
  - File name and path
  - Language
  - Text answer
  - Verbal audio file (answer)
  - Category assignment
- Category management:
  - Name
  - Image button URLs (normal, hover, click states)
  - Language
- Language management via localization files

### User Experience
- Replay button disables after reaching max configured replays
- Message displayed when max replays reached

## Technical Requirements

### Frontend
- React Native Web for cross-platform compatibility
- Support for both phone and tablet sizes

### Database
- SQLite for local database on phones/tablets
- Compatible database for online version (SQLite or possibly Postgres)
- Prisma for database type management

### Development
- TypeScript preferred
- Git for code management
- Git for managing published versions of apps

### Deployment
- Web version for content management and gameplay
- Native apps for iOS and Android that work offline
- Static app generation from CMS for app store publishing
- Export via Xcode/Android Studio for app store submission

### Integration
- Eleven Labs integration for generating human speaking answers during content management

## Pages Required

### App Pages
1. Intro/Loading page with app logo and loading messages
2. Main screen with:
   - 6 category buttons
   - Replay and reveal buttons
   - Settings button
   - App logo at top middle
   - Central area for text answers and system messages
3. Configuration screen

### Web Admin CMS
1. Login screen
2. User management for admins
3. Categories listing
4. Sounds listing (filtered by category)
5. Language management
6. CRUD operations for all managed items

## Key Challenges to Address
1. Offline functionality for mobile apps while maintaining online CMS
2. Static app generation workflow from CMS
3. Multi-platform deployment strategy
4. Localization implementation
5. Database synchronization between online and offline versions
