// Import polyfills first
import 'intl-pluralrules';

// Set up error handling before anything else
import { LogBox, AppRegistry } from 'react-native';
LogBox.ignoreLogs([
  'react-native-gesture-handler',
  'Reanimated 2',
  'RNGestureHandlerModule'
]);

// Explicitly require gesture handler to ensure it's properly loaded
if (process.env.NODE_ENV !== 'production') {
  console.log('Initializing gesture handler...');
}

// Import gesture handler with error catching
try {
  require('react-native-gesture-handler');
} catch (e) {
  console.warn('Error importing react-native-gesture-handler:', e);
}

// Register the app after all initialization
import { registerRootComponent } from 'expo';
import App from './App';

registerRootComponent(App);
