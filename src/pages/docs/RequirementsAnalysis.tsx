import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

const RequirementsAnalysis: React.FC = () => {
  const [content, setContent] = useState<string>('Loading requirements analysis...');

  useEffect(() => {
    // In a real implementation, this would fetch the content from the server
    // For now, we'll use the content from the requirements_analysis.md file
    fetch('/requirements_analysis.md')
      .then(response => response.text())
      .then(text => setContent(text))
      .catch(error => {
        console.error('Error loading requirements analysis:', error);
        // Fallback to hardcoded content if fetch fails
        setContent(`
# SoundWave App - Requirements Analysis

## 1. Project Overview

### 1.1 Purpose
SoundWave is a sound-based game application designed for phones, tablets, and web browsers. The game challenges users to identify sounds from various categories and provides a content management system for administrators.

### 1.2 Target Platforms
- Mobile phones (iOS and Android)
- Tablets (iOS and Android)
- Web browsers

### 1.3 Target Audience
- General users interested in sound recognition games
- Educational institutions
- Content administrators

## 2. Functional Requirements

### 2.1 Game Interface

#### 2.1.1 Sound Categories
- The game must have 6 main circular buttons for sound categories:
  - Games
  - Animals
  - Industrial
  - Environment
  - Home & Office
  - Music

#### 2.1.2 Sound Playback
- Pressing a category button must randomly select a sound from that category
- The app must provide a dedicated replay button
- The app must provide a reveal button that:
  - Plays an audio clip revealing the name of the sound
  - Displays a text version of the answer on the screen
- The app must track and display the count of replays for each sound
- The app must support limiting the number of replays based on settings

#### 2.1.3 Settings
- The app must include a settings button that opens a configuration page
- Settings must include:
  - Maximum number of replays (specific number or infinite)
  - Language selection from available languages

### 2.2 Content Management System

#### 2.2.1 User Management
- The CMS must support user authentication and authorization
- The CMS must allow administrators to manage other admin users

#### 2.2.2 Sound Management
- The CMS must allow uploading and managing sound files
- The CMS must support categorizing sounds
- The CMS must allow entering text answers for sounds
- The CMS must integrate with Eleven Labs to generate verbal answers from text

#### 2.2.3 Category Management
- The CMS must allow creating, editing, and deleting categories
- The CMS must support uploading image buttons with normal, hover, and click states
- The CMS must associate categories with specific languages

#### 2.2.4 Language Management
- The CMS must support managing multiple languages
- The CMS must allow uploading localization files
- The CMS must associate content with specific languages

#### 2.2.5 App Generation
- The CMS must support generating static versions of the app for iOS and Android
- The generated apps must include all necessary content for offline use

## 3. Non-Functional Requirements

### 3.1 Performance
- The app must load quickly on all supported platforms
- Sound playback must be responsive with minimal delay
- The CMS must handle large numbers of sound files efficiently

### 3.2 Usability
- The UI must be intuitive and easy to use
- The app must be accessible on both phone and tablet sizes
- The app must provide clear feedback for user actions

### 3.3 Reliability
- The mobile apps must function completely offline
- The app must handle errors gracefully
- The app must prevent data loss during content management

### 3.4 Security
- The CMS must implement secure authentication
- The CMS must protect against common web vulnerabilities
- User data must be properly protected

### 3.5 Localization
- The app must support English and French initially
- The app must be designed to easily add Spanish in the future
- All user-facing text must be localizable

## 4. Technical Requirements

### 4.1 Frontend
- Must use React Native Web for cross-platform compatibility
- Must use TypeScript for type safety
- Must use Tailwind CSS for UI design
- Should consider using Vercel's Tailwind component library

### 4.2 Database
- Mobile apps must use SQLite for local storage
- Web CMS may use PostgreSQL if needed for scaling
- Must use Prisma for database ORM

### 4.3 Deployment
- Web version must be deployed online for testing
- Mobile apps must be exportable via Xcode and Android Studio
- App stores submissions must be supported

### 4.4 Integration
- Must integrate with Eleven Labs for generating verbal answers
- Must support Git for code and content version management

## 5. User Interface Requirements

### 5.1 Pages and Screens

#### 5.1.1 Intro/Loading Page
- Must display app logo
- Must show loading messages
- Must transition smoothly to the main screen

#### 5.1.2 Main Game Screen
- Must display 6 category buttons in a grid layout
- Must show replay and reveal buttons
- Must display replay count
- Must include a settings button
- Must show app logo at the top middle
- Must have a central area for text answers and messages

#### 5.1.3 Settings Screen
- Must allow configuration of maximum replays
- Must allow language selection
- Must provide clear navigation back to the main screen

#### 5.1.4 CMS Screens
- Must include login screen
- Must include dashboard
- Must include category management
- Must include sound management
- Must include language management
- Must include user management

## 6. Constraints

### 6.1 Technical Constraints
- Must work on both mobile and web platforms
- Mobile apps must function offline
- Must support multiple languages

### 6.2 Business Constraints
- Must be ready for deployment to app stores
- Must support content updates without requiring app updates

## 7. Assumptions and Dependencies

### 7.1 Assumptions
- Users have basic familiarity with mobile and web applications
- Administrators have basic content management skills
- Sound files will be provided separately

### 7.2 Dependencies
- Eleven Labs API for generating verbal answers
- App store approval processes
- Sound file availability and quality

## 8. Acceptance Criteria

### 8.1 Game Functionality
- Users can select from 6 different sound categories
- Users can replay sounds up to the configured maximum
- Users can reveal the answer via audio and text
- Users can configure settings for replays and language

### 8.2 CMS Functionality
- Administrators can manage all content through the web interface
- Administrators can generate static versions of the app
- Content is properly localized based on selected language

### 8.3 Technical Implementation
- The application works on all target platforms
- The application meets all performance requirements
- The application supports offline use on mobile devices
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

export default RequirementsAnalysis;
