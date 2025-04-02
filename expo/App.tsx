import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Navigation from './src/navigation';
import './src/i18n'; // Import i18n configuration
import ErrorBoundary from './src/components/ErrorBoundary';
import GestureHandlerWrapper from './src/components/GestureHandlerWrapper';

// Main App component
export default function App() {
  return (
    <ErrorBoundary>
      <GestureHandlerWrapper style={{ flex: 1 }}>
        <StatusBar style="light" />
        <Navigation />
      </GestureHandlerWrapper>
    </ErrorBoundary>
  );
}
