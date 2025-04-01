# SoundWave App - Rules for Coding Agents

## Purpose
This document provides a set of rules and guidelines for AI coding agents to follow when implementing the SoundWave application. These rules are designed to keep development on track and ensure that the final product meets all requirements.

## Core Technology Rules

### 1. React Native Web Implementation
- **MUST** use React Native Web for all UI components to ensure cross-platform compatibility
- **MUST** ensure components work correctly on mobile phones, tablets, and web browsers
- **MUST** use TypeScript for all code implementation
- **MUST** follow React Native best practices for component structure and lifecycle management

### 2. Database Implementation
- **MUST** use SQLite for local database on mobile applications
- **MUST** implement Prisma as the ORM for database type management
- **MUST** ensure database schema follows the specified design in the technical specification
- **MUST** implement proper data migration strategies for schema updates
- **SHOULD** consider using PostgreSQL for the web CMS if scaling requirements demand it, but ensure SQLite compatibility for static app generation

### 3. Content Management
- **MUST** implement a separate CMS interface in the web version only
- **MUST** ensure mobile apps can function completely offline with local content
- **MUST** implement a static app generation process that bundles all necessary content
- **MUST** implement proper user authentication and authorization for CMS access
- **MUST** implement CRUD operations for all managed content types

### 4. Localization
- **MUST** implement localization support for English and French initially
- **MUST** design the localization system to easily accommodate Spanish in the future
- **MUST** use standard localization file formats that support easy language additions
- **MUST** ensure all user-facing text is localized, including error messages and notifications
- **MUST** implement language selection in the settings screen

## UI Implementation Rules

### 5. Main Game Interface
- **MUST** implement exactly 6 circular buttons for sound categories
- **MUST** position the buttons according to the layout specified in the technical document
- **MUST** implement proper visual feedback for button states (normal, hover, pressed)
- **MUST** ensure buttons are properly sized and spaced for different device sizes
- **MUST** implement the app logo at the top middle of the screen
- **MUST** implement a central area for text answers and system messages

### 6. Sound Playback
- **MUST** implement random sound selection when a category button is pressed
- **MUST** implement a dedicated replay button that replays the current sound
- **MUST** implement a reveal button that plays the verbal answer and displays the text answer
- **MUST** implement a counter for the number of replays
- **MUST** disable the replay button after reaching the maximum configured replays
- **MUST** display an appropriate message when maximum replays is reached

### 7. Settings Screen
- **MUST** implement a settings button that navigates to the configuration screen
- **MUST** implement a maximum replay setting with options for specific numbers and infinite
- **MUST** implement language selection from available languages
- **MUST** ensure settings are persisted between app sessions
- **MUST** implement proper navigation back to the main screen

### 8. Intro/Loading Screen
- **MUST** implement an intro/loading screen with the app logo
- **MUST** display appropriate loading messages
- **MUST** ensure smooth transition to the main screen once loading is complete
- **SHOULD** implement a progress indicator if loading takes significant time

## CMS Implementation Rules

### 9. CMS Authentication
- **MUST** implement a secure login screen for CMS access
- **MUST** implement proper password hashing and security measures
- **MUST** implement role-based access control for CMS users
- **MUST** implement proper session management and timeout handling

### 10. User Management
- **MUST** implement CRUD operations for admin users
- **MUST** implement proper validation for user data
- **MUST** ensure secure password reset functionality
- **MUST** prevent deletion of the last admin user

### 11. Category Management
- **MUST** implement CRUD operations for sound categories
- **MUST** support uploading and managing button images for normal, hover, and click states
- **MUST** associate categories with specific languages
- **MUST** implement proper validation for category data

### 12. Sound Management
- **MUST** implement CRUD operations for sound files
- **MUST** support uploading and managing sound files
- **MUST** implement category filtering for sounds
- **MUST** implement proper validation for sound data
- **MUST** integrate with Eleven Labs to generate verbal answers from text
- **MUST** store and manage both sound files and verbal answer files

### 13. Language Management
- **MUST** implement CRUD operations for languages
- **MUST** support uploading and managing localization files
- **MUST** implement proper validation for language data
- **MUST** ensure all existing content is properly associated with languages

## Development Process Rules

### 14. Version Control
- **MUST** use Git for code management
- **MUST** follow a consistent branching strategy
- **MUST** write clear, descriptive commit messages
- **MUST** regularly push changes to remote repository
- **SHOULD** consider using Git for managing published versions of the apps

### 15. Testing
- **MUST** implement unit tests for critical functionality
- **MUST** implement integration tests for API endpoints
- **MUST** test on multiple device sizes and platforms
- **MUST** test all localization aspects
- **MUST** test offline functionality thoroughly

### 16. Deployment
- **MUST** implement a clear deployment process for the web version
- **MUST** document the process for generating static app versions
- **MUST** ensure the static app generation process is reliable and reproducible
- **MUST** document the process for submitting to app stores
- **MUST** implement proper versioning for all deployments

## Integration Rules

### 17. Eleven Labs Integration
- **MUST** implement proper integration with Eleven Labs API
- **MUST** handle API errors gracefully
- **MUST** implement proper caching of generated audio to avoid unnecessary API calls
- **MUST** ensure generated audio files are properly stored and associated with sounds
- **MUST** support generating answers in multiple languages

### 18. Cross-Platform Compatibility
- **MUST** ensure consistent behavior across all supported platforms
- **MUST** implement responsive design that works on all device sizes
- **MUST** test on both iOS and Android devices
- **MUST** test on various web browsers
- **MUST** ensure offline functionality works correctly on mobile devices

## Performance Rules

### 19. Resource Management
- **MUST** optimize audio and image assets for size and quality
- **MUST** implement proper loading and unloading of resources
- **MUST** ensure the app has acceptable startup time on all platforms
- **MUST** implement proper caching strategies for frequently accessed data
- **MUST** ensure the app performs well on lower-end devices

### 20. Error Handling
- **MUST** implement proper error handling throughout the application
- **MUST** display user-friendly error messages
- **MUST** implement logging for debugging purposes
- **MUST** handle network errors gracefully, especially for the offline mode
- **MUST** implement proper fallback mechanisms for critical functionality

## Security Rules

### 21. Data Security
- **MUST** implement proper data validation for all user inputs
- **MUST** protect against common web vulnerabilities (XSS, CSRF, etc.)
- **MUST** use HTTPS for all API communications
- **MUST** implement proper authentication and authorization
- **MUST** ensure sensitive data is properly protected

### 22. File Security
- **MUST** validate all uploaded files
- **MUST** implement proper file access controls
- **MUST** ensure secure storage of media files
- **MUST** implement proper error handling for file operations
- **MUST** prevent unauthorized access to media files

## Maintenance Rules

### 23. Code Quality
- **MUST** follow consistent coding standards
- **MUST** write clean, maintainable code
- **MUST** implement proper documentation
- **MUST** avoid code duplication
- **SHOULD** use static code analysis tools to maintain code quality

### 24. Performance Monitoring
- **SHOULD** implement performance monitoring
- **SHOULD** track key performance metrics
- **SHOULD** implement error tracking
- **SHOULD** implement usage analytics
- **SHOULD** regularly review performance data and make improvements

## Conclusion
Following these rules will ensure that the SoundWave application is implemented according to the requirements and meets the expected quality standards. These rules should be used as a guide throughout the development process to keep the implementation on track.
