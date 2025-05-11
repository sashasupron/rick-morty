import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { CharactersList } from '../pages/charactersList';
import { Provider } from 'react-redux';
import { store } from './store';
// import SettingsPage from '../pages/SettingsPage';

const Tab = createBottomTabNavigator();

const AppEntry = () => (
  <Provider store = {store}>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name = "Main" component = {CharactersList} />
        {/* <Tab.Screen name = "Settings" component = {SettingsPage} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  </Provider>
);

export default AppEntry;
