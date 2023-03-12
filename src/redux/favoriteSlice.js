import { createSlice } from '@reduxjs/toolkit';
import { Alert } from 'react-native';

export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: {
    value: [],
  },
  reducers: {
    addToFavorites: (state, action) => {
        if (state.value.length >= 10) {
          return Alert.alert("You have exceeded the number of favorite characters.",
          "You should remove a character from favorites")
        }
        state.value = [...state.value, action.payload];
    },
    removeFromFavorites: (state, action) => {
        state.value = state.value.filter(el => el.id !== action.payload.id);
  },
  },
});

export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;

export const selectCount = state => state.counter.value;

export default favoriteSlice.reducer;