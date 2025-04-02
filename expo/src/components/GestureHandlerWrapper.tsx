import React from 'react';
import { View, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface GestureHandlerWrapperProps {
  children: React.ReactNode;
  style?: any;
}

/**
 * Component that only uses GestureHandlerRootView on native platforms
 * to avoid errors in Expo Go with SDK 52
 */
export default function GestureHandlerWrapper({ children, style }: GestureHandlerWrapperProps) {
  // Use regular View on web to avoid gesture handler initialization issues
  if (Platform.OS === 'web') {
    return <View style={style}>{children}</View>;
  }

  // On native platforms, use GestureHandlerRootView with error handling
  try {
    return <GestureHandlerRootView style={style}>{children}</GestureHandlerRootView>;
  } catch (error) {
    console.warn('Failed to render GestureHandlerRootView:', error);
    return <View style={style}>{children}</View>;
  }
}
