// Import polyfills and configuration first
import 'intl-pluralrules';

// Initialize gesture handler before importing other components
import { LogBox } from 'react-native';
import 'react-native-gesture-handler';

// Ignore specific warnings that might appear due to gesture handler issues
LogBox.ignoreLogs(['react-native-gesture-handler']);

// Import the main app components
import { registerRootComponent } from 'expo';
import App from './App';

registerRootComponent(App);
