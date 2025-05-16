// redux slice for character management
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from './types';

interface CharacterState {
  characters: Character[];
  loading: boolean;
  error: string | null;
}

const initialState: CharacterState = { // initial states when the application starts
  characters: [],
  loading: false,
  error: null,
};

const characterSlice = createSlice({
  name: 'character', // name of slice (key in store)
  initialState,
  reducers: {
    setCharacters(state, action: PayloadAction<Character[]>) { // reducer
      state.characters = action.payload; // updates the characters field to what came in the payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setCharacters, setLoading, setError } = characterSlice.actions;
export const characterReducer = characterSlice.reducer;
