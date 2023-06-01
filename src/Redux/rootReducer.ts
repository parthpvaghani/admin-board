import { combineReducers } from '@reduxjs/toolkit';
import entriesReducer from './entriesSlice';

const rootReducer = combineReducers({
  entries: entriesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
