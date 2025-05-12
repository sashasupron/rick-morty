import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { CharactersListStack } from '../pages/charactersList/characterListStack';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store';
import { Settings } from '../pages/settings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadStoredTheme } from '../shared/model/theme/themeSlice'; 

const Tab = createBottomTabNavigator();

const AppWithThemeLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('appTheme');
      if (storedTheme === 'light' || storedTheme === 'dark') {
        dispatch(loadStoredTheme(storedTheme));
      }
    };
    fetchTheme();
  }, [dispatch]);

  return (
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
        })}
      >
        <Tab.Screen name = "Main" component = {CharactersListStack} options = {{ headerShown: false }} />
        <Tab.Screen name = "Settings" component = {Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const AppEntry = () => (
  <Provider store = {store}>
    <AppWithThemeLoader />
  </Provider>
);


export default AppEntry;
