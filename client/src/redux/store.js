/** @format */

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import boardReducer from './features/boardSlice';
import favoritesReducer from './features/favoritesSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		boards: boardReducer,
		favorites: favoritesReducer,
	},
});
