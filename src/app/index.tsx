import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { CharactersListStack } from '../pages/charactersList/characterListStack';
import { Provider } from 'react-redux';
import { store } from './store';
import { Settings } from '../pages/settings';

const Tab = createBottomTabNavigator();

const AppEntry = () => (
  <Provider store = {store}>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name = "Main" component = {CharactersListStack} options = {{ headerShown: false}} />
        <Tab.Screen name = "Settings" component = {Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  </Provider>
);

export default AppEntry;
