import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      state.theme = action.payload;
      AsyncStorage.setItem('appTheme', action.payload); // persist to storage
    },
    loadStoredTheme(state, action: PayloadAction<ThemeMode>) {
      state.theme = action.payload;
    },
  },
});

export const { setTheme, loadStoredTheme } = themeSlice.actions;

export default themeSlice.reducer;
