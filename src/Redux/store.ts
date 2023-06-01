import { combineReducers } from 'redux';
import entriesReducer from './entriesSlice';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  entries: entriesReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
