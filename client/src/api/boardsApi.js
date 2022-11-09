/** @format */

import axiosClient from './axiosClient';

const boardsApi = {
	createBoard: () => axiosClient.post('boards'),
	getAllBoards: () => axiosClient.get('boards'),
	updateBoardPosition: (params) => {
		console.log('updateBoardPosition used in boardsApi');
		axiosClient.put('boards', params);
	},
};

export default boardsApi;
