/** @format */

import axiosClient from './axiosClient';

const boardsApi = {
	createBoard: () => axiosClient.post('boards'),
	getAllBoards: () => axiosClient.get('boards'),
	updateBoardPosition: (params) => {
		axiosClient.put('boards', params);
	},
	getOneBoard: (boardId) => {
		return axiosClient.get(`boards/${boardId}`);
	},
};

export default boardsApi;
