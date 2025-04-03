import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Platform } from 'react-native';
import Navigation from './src/navigation';
import './src/i18n'; // Import i18n configuration
import ErrorBoundary from './src/components/ErrorBoundary';
import GestureHandlerWrapper from './src/components/GestureHandlerWrapper';

// Main App component
export default function App() {
  // Set up error handling for unhandled promise rejections
  useEffect(() => {
    // Set up error handling for development
    if (__DEV__) {
      // Log all errors in development mode
      const errorHandler = (error: Error) => {
        console.error('Unhandled error:', error);
      };
      
      // Add event listener for unhandled promise rejections
      if (Platform.OS !== 'web') {
        const subscription = require('react-native').NativeEventEmitter.prototype
          .addListener('unhandledPromiseRejection', errorHandler);
          
        return () => subscription.remove();
      }
    }
  }, []);

  return (
    <ErrorBoundary>
      <View style={{ flex: 1, backgroundColor: '#000000' }}>
        <StatusBar style="light" />
        {/* Wrap navigation in GestureHandlerWrapper for safe initialization */}
        <GestureHandlerWrapper style={{ flex: 1 }}>
          <Navigation />
        </GestureHandlerWrapper>
      </View>
    </ErrorBoundary>
  );
}
