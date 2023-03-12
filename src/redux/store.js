import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {combineReducers} from "redux";
import { persistReducer } from 'redux-persist';
import favoriteSlice from './favoriteSlice';

const reducers = combineReducers({
  addToFavorites: favoriteSlice
});

const persistConfig = {
    key: 'root',
  storage: AsyncStorage,
  whitelist: ['addToFavorites']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
    }),
});

export default store;