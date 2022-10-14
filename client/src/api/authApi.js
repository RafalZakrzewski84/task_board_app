/** @format */

import axiosClient from './axiosClient';

//routes the same as in server routes auth
const authApi = {
	signup: (params) => axiosClient.post('auth/signup', params),
	login: (params) => axiosClient.post('auth/login', params),
	verifyToken: () => axiosClient.post('auth/verify-token'),
};

export default authApi;
