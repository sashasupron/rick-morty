import { configureStore } from '@reduxjs/toolkit';
import { characterReducer } from '../../entities/character/model/characterSlice';
import themeReducer from '../../shared/model/theme/themeSlice';

export const store = configureStore({
  reducer: {
    character: characterReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
