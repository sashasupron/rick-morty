import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};

interface CharacterState {
  characters: Character[];
  loading: boolean;
  error: string | null;
}

const initialState: CharacterState = {
  characters: [],
  loading: false,
  error: null,
};

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setCharacters(state, action: PayloadAction<Character[]>) {
      state.characters = action.payload;
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
