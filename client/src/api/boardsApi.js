/** @format */

import axiosClient from './axiosClient';

const boardsApi = {
	createBoard: () => axiosClient.post('boards'),
	getAllBoards: () => axiosClient.get('boards'),
	updateBoardPosition: (params) => {
		axiosClient.put('boards', params);
	},
	getOneBoard: (boardId) => axiosClient.get(`boards/${boardId}`),
	updateBoard: (boardId, params) =>
		axiosClient.put(`boards/${boardId}`, params),
	getFavoriteBoards: () => axiosClient.get('boards/favorites'),
	updateFavoritePosition: (params) =>
		axiosClient.put('boards/favorites', params),
};

export default boardsApi;
