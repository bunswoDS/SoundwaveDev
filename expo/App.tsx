import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigation from './src/navigation';
import './src/i18n'; // Import i18n configuration
import ErrorBoundary from './src/components/ErrorBoundary';

// Main App component
export default function App() {
  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="light" />
        <Navigation />
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
