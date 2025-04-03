// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Enable resolution of node_modules from project root
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
];

// Force resolve for gesture handler and reanimated
config.resolver.extraNodeModules = {
  'react-native-gesture-handler': path.resolve(__dirname, 'node_modules/react-native-gesture-handler'),
  'react-native-reanimated': path.resolve(__dirname, 'node_modules/react-native-reanimated'),
};

module.exports = config;
