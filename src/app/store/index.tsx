// initializing reedux store
import { configureStore } from '@reduxjs/toolkit';
import { characterReducer } from '../../entities/character/model/characterSlice';
import themeReducer from '../../shared/model/theme/themeSlice';

export const store = configureStore({
  reducer: {
    character: characterReducer, // responsible for characters state (list, filters)
    theme: themeReducer, // controls the theme (light/dark)
  },
});

export type RootState = ReturnType<typeof store.getState>; // typification for the entire Redux state
export type AppDispatch = typeof store.dispatch; // type for dispatch, used when calling dispatch(action) in components so that TS knows which actions are valid
