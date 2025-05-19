// Redux slice for theme management
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Appearance } from 'react-native';

export type ThemeMode = 'light' | 'dark';

interface ThemeState {
  theme: ThemeMode;
}

const getInitialTheme = (): ThemeMode => {
  const systemTheme = Appearance.getColorScheme();
  return systemTheme === 'dark' ? 'dark' : 'light';
};

const initialState: ThemeState = {
  theme: getInitialTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeMode>) {
      // sets theme and saves it to AsyncStorage.
      state.theme = action.payload;
      AsyncStorage.setItem('appTheme', action.payload);
    },
    loadStoredTheme(state, action: PayloadAction<ThemeMode>) {
      // loads theme from AsyncStorage
      state.theme = action.payload;
    },
  },
});

export const { setTheme, loadStoredTheme } = themeSlice.actions;

export default themeSlice.reducer;
