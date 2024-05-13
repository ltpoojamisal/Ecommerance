// store.js
import { configureStore } from '@reduxjs/toolkit'
import{rootReducer} from './UserSclice.js';

export const store = configureStore({
  reducer: rootReducer,
});
