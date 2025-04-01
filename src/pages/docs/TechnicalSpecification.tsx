import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

const TechnicalSpecification: React.FC = () => {
  const [content, setContent] = useState<string>('Loading technical specification...');

  useEffect(() => {
    // In a real implementation, this would fetch the content from the server
    // For now, we'll use a placeholder
    setContent(`
# SoundWave App - Technical Specification

## 1. Introduction

### 1.1 Purpose
This technical specification document outlines the architecture, technology stack, and implementation details for the SoundWave application, a sound-based game that will be available on mobile phones, tablets, and web browsers.

### 1.2 Scope
This document covers the technical aspects of the SoundWave application, including the frontend, backend, database, and deployment strategies. It serves as a guide for developers implementing the application.

## 2. System Architecture

### 2.1 Overview
SoundWave will use a hybrid architecture with a web application that serves both as a game platform and a content management system (CMS), and native mobile applications for iOS and Android that can function offline.

### 2.2 Components
- **Web Application**: React Native Web frontend with game functionality and CMS
- **Mobile Applications**: Native iOS and Android apps built with React Native
- **Database**: SQLite for local storage, PostgreSQL for web CMS
- **API Layer**: RESTful API for communication between frontend and backend
- **Content Delivery**: Static content generation for offline mobile apps

## 3. Technology Stack

### 3.1 Frontend
- **Framework**: React Native Web
- **Language**: TypeScript
- **UI Components**: Custom components with Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router
- **Styling**: Tailwind CSS

### 3.2 Backend
- **API**: RESTful API with Express.js
- **Database ORM**: Prisma
- **Authentication**: JWT-based authentication
- **File Storage**: Local file system for development, Cloud storage for production

### 3.3 Database
- **Local Storage**: SQLite
- **Web CMS**: PostgreSQL (compatible with SQLite for static generation)
- **ORM**: Prisma

### 3.4 DevOps
- **Version Control**: Git
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel for web, App Store and Play Store for mobile
- **Monitoring**: Sentry for error tracking

## 4. Component Architecture

### 4.1 Game Interface
- Main screen with 6 category buttons
- Sound playback system
- Replay and reveal buttons
- Settings configuration

### 4.2 CMS Interface
- User authentication and authorization
- Sound management
- Category management
- Language management
- Static app generation

### 4.3 Shared Components
- Audio player
- Button components
- Card components
- Modal components
- Form components

## 5. Database Schema

### 5.1 User Model
- ID (Primary Key)
- Username
- Email
- Password (hashed)
- Role (Admin, Editor)
- Created At
- Updated At

### 5.2 Category Model
- ID (Primary Key)
- Name
- Image URLs (normal, hover, click states)
- Language ID (Foreign Key)
- Created At
- Updated At

### 5.3 Sound Model
- ID (Primary Key)
- Name
- Sound File Path
- Answer Text
- Answer Audio Path
- Category ID (Foreign Key)
- Language ID (Foreign Key)
- Created At
- Updated At

### 5.4 Language Model
- ID (Primary Key)
- Code (e.g., 'en', 'fr')
- Name
- Created At
- Updated At

### 5.5 Settings Model
- ID (Primary Key)
- User ID (Foreign Key)
- Max Replays
- Language ID (Foreign Key)
- Created At
- Updated At

## 6. API Endpoints

### 6.1 Authentication
- POST /api/auth/login
- POST /api/auth/logout
- POST /api/auth/register
- GET /api/auth/me

### 6.2 Users
- GET /api/users
- GET /api/users/:id
- POST /api/users
- PUT /api/users/:id
- DELETE /api/users/:id

### 6.3 Categories
- GET /api/categories
- GET /api/categories/:id
- POST /api/categories
- PUT /api/categories/:id
- DELETE /api/categories/:id

### 6.4 Sounds
- GET /api/sounds
- GET /api/sounds/:id
- POST /api/sounds
- PUT /api/sounds/:id
- DELETE /api/sounds/:id
- GET /api/sounds/category/:categoryId

### 6.5 Languages
- GET /api/languages
- GET /api/languages/:id
- POST /api/languages
- PUT /api/languages/:id
- DELETE /api/languages/:id

### 6.6 Settings
- GET /api/settings
- PUT /api/settings

### 6.7 Static App Generation
- POST /api/generate-app

## 7. UI/UX Design

### 7.1 Game Interface
- Clean, modern design with focus on usability
- Responsive layout for different device sizes
- Circular buttons for categories
- Clear visual feedback for button states
- Central area for text answers and messages

### 7.2 CMS Interface
- Dashboard with key metrics
- Tabular views for data management
- Form-based editors for content creation
- Preview functionality for sounds and categories
- User-friendly file upload interface

## 8. Localization

### 8.1 Strategy
- JSON-based localization files
- Support for English and French initially
- Expandable to include Spanish and other languages
- Localization of all UI elements, error messages, and content

### 8.2 Implementation
- Language selection in settings
- Dynamic loading of localization files
- Fallback to default language when translation is missing
- Support for right-to-left languages in the future

## 9. Offline Functionality

### 9.1 Mobile Apps
- Complete offline functionality
- Local SQLite database
- Bundled sound and image assets
- Settings stored locally

### 9.2 Static App Generation
- Generated from CMS
- Includes all necessary assets and data
- Packaged for app store submission
- Version tracking for updates

## 10. Security

### 10.1 Authentication
- JWT-based authentication
- Secure password storage with bcrypt
- Role-based access control
- Session management

### 10.2 Data Protection
- Input validation
- Protection against common web vulnerabilities
- Secure file uploads
- HTTPS for all communications

## 11. Performance

### 11.1 Optimization
- Lazy loading of components
- Optimized asset loading
- Efficient database queries
- Caching strategies

### 11.2 Monitoring
- Performance metrics tracking
- Error logging
- Usage analytics
- Regular performance reviews

## 12. Testing

### 12.1 Unit Testing
- Component testing with Jest
- API endpoint testing
- Database model testing
- Utility function testing

### 12.2 Integration Testing
- End-to-end testing with Cypress
- API integration testing
- Database integration testing
- Authentication flow testing

### 12.3 User Testing
- Usability testing
- Cross-device testing
- Localization testing
- Accessibility testing

## 13. Deployment

### 13.1 Web Application
- Deployment to Vercel
- CI/CD pipeline with GitHub Actions
- Environment-specific configurations
- Automated testing before deployment

### 13.2 Mobile Applications
- App Store submission process
- Play Store submission process
- Beta testing with TestFlight and Google Play Beta
- Version management and updates

## 14. Maintenance

### 14.1 Monitoring
- Error tracking with Sentry
- Performance monitoring
- Usage analytics
- Server health monitoring

### 14.2 Updates
- Regular feature updates
- Bug fixes
- Security patches
- Content updates

## 15. Future Enhancements

### 15.1 Features
- Additional languages
- More sound categories
- User accounts for players
- Multiplayer functionality
- Achievements and leaderboards

### 15.2 Technical
- Progressive Web App (PWA) support
- Advanced analytics
- Machine learning for sound recognition
- Voice commands
- Accessibility improvements

## 16. Conclusion

This technical specification provides a comprehensive guide for the implementation of the SoundWave application. It covers all aspects of the system architecture, technology stack, and implementation details. By following this specification, developers can create a high-quality, cross-platform sound game that meets all the requirements.
    `);
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
            } else if (line.startsWith('- ')) {
              return <li key={index} className="ml-6">{line.substring(2)}</li>;
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

export default TechnicalSpecification;
