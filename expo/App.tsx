import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Navigation from './src/navigation';
import './src/i18n'; // Import i18n configuration
import ErrorBoundary from './src/components/ErrorBoundary';

// Main App component
export default function App() {
  return (
    <ErrorBoundary>
      <StatusBar style="light" />
      <Navigation />
    </ErrorBoundary>
  );
}
