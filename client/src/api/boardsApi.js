/** @format */

import axiosClient from './axiosClient';

const boardsApi = {
	createBoard: () => axiosClient.post('boards'),
	getAllBoards: () => axiosClient.get('boards'),
};

export default boardsApi;
