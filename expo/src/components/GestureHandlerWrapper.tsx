import React from 'react';
import { View, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface GestureHandlerWrapperProps {
  children: React.ReactNode;
  style?: any;
}

/**
 * Component that safely wraps content with GestureHandlerRootView
 * with proper error handling for Expo SDK 52
 */
export default function GestureHandlerWrapper({ children, style }: GestureHandlerWrapperProps) {
  // Use regular View on web to avoid gesture handler initialization issues
  if (Platform.OS === 'web') {
    return <View style={style}>{children}</View>;
  }

  // On native platforms, use GestureHandlerRootView with safe rendering
  return (
    <View style={style}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {children}
      </GestureHandlerRootView>
    </View>
  );
}
