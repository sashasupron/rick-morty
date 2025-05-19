// contains the main structure of the application
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { CharactersListStack } from '../pages/charactersList/characterListStack';
import { Settings } from '../pages/settings';
import { CustomDarkTheme, CustomLightTheme } from '../shared/model/theme/customNavigationTheme';
import { loadStoredTheme } from '../shared/model/theme/themeSlice';
import { RootState, store } from './store';

const Tab = createBottomTabNavigator();

const AppWithThemeLoader = () => {
  // gets last theme from AsyncStorage
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const navigationTheme = theme === 'dark' ? CustomDarkTheme : CustomLightTheme;

  useEffect(() => {
    const fetchTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('appTheme');
      if (storedTheme === 'light' || storedTheme === 'dark') {
        dispatch(loadStoredTheme(storedTheme)); // add theme to reducer
      }
    };
    fetchTheme();
  }, [dispatch]);

  return (
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator // bottom navigation
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Main') {
              iconName = focused ? 'happy' : 'happy-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          // tabBarActiveTintColor: 'green',
          // tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Main" component={CharactersListStack} options={{ headerShown: false }} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const AppEntry = () => (
  // wraps application in Provider to make the Redux store available in any component
  <Provider store={store}>
    <AppWithThemeLoader />
  </Provider>
);

export default AppEntry;
