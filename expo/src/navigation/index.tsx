import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { 
  Settings as SettingsIcon, 
  Home as HomeIcon,
  Database as CMSIcon
} from 'lucide-react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens
import GameScreen from '../screens/game/GameScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import { 
  CMSDashboardScreen,
  CategoriesManagementScreen,
  LanguagesManagementScreen,
  SoundsManagementScreen
} from '../screens/cms';

// Define stack navigator param list
export type RootStackParamList = {
  Main: undefined;
  Settings: undefined;
  CMS: undefined;
  CMSDashboard: undefined;
  CategoriesManagement: undefined;
  LanguagesManagement: undefined;
  SoundsManagement: undefined;
};

// Create navigators
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
const CMSStack = createStackNavigator<RootStackParamList>();

// CMS stack navigator
const CMSNavigator = () => {
  return (
    <CMSStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <CMSStack.Screen name="CMSDashboard" component={CMSDashboardScreen} />
      <CMSStack.Screen name="CategoriesManagement" component={CategoriesManagementScreen} />
      <CMSStack.Screen name="LanguagesManagement" component={LanguagesManagementScreen} />
      <CMSStack.Screen name="SoundsManagement" component={SoundsManagementScreen} />
    </CMSStack.Navigator>
  );
};

// Main tab navigator
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopColor: '#333333',
        },
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#9ca3af',
      }}
    >
      <Tab.Screen 
        name="Game" 
        component={GameScreen} 
        options={{
          tabBarLabel: 'Game',
          tabBarIcon: ({ color, size }) => (
            <HomeIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <SettingsIcon color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="CMS" 
        component={CMSNavigator}
        options={{
          tabBarLabel: 'CMS',
          tabBarIcon: ({ color, size }) => (
            <CMSIcon color={color} size={size} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
};

// Root navigator
const Navigation = () => {
  try {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name="Main" 
              component={MainTabs} 
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  } catch (error) {
    console.warn('Navigation error:', error);
    return null;
  }
};

export default Navigation;
