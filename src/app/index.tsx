import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { CharactersListStack } from '../pages/charactersList/characterListStack';
import { Provider } from 'react-redux';
import { store } from './store';
import { Settings } from '../pages/settings';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const AppEntry = () => (
  <Provider store = {store}>
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions = {({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
    
            if (route.name === 'Main') {
              iconName = focused ? 'happy' : 'happy-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }
    
            return <Ionicons name = {iconName} size = {size} color = {color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name = "Main" component = {CharactersListStack} options = {{ headerShown: false}} />
        <Tab.Screen name = "Settings" component = {Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  </Provider>
);

export default AppEntry;
