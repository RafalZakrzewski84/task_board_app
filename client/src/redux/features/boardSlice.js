/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: [] };

export const boardSlice = createSlice({
	name: 'boards',
	initialState,
	reducers: {
		setBoards: (state, action) => {
			state.value = action.value;
		},
	},
});

export const { setBoards } = boardSlice.actions;
export default boardSlice.reducer;
