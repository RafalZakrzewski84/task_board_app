/** @format */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { setBoards } from '../redux/features/boardSlice';
import boardsApi from '../api/boardsApi';

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	const createBoard = async () => {
		try {
			setLoading(true);
			const res = await boardsApi.createBoard();
			dispatch(setBoards([res]));
			navigate(`/boards/${res._id}`);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box
			sx={{
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}>
			<LoadingButton
				variant="outlined"
				color="success"
				onClick={createBoard}
				loading={loading}>
				Click here to create your first board
			</LoadingButton>
		</Box>
	);
};

export default Home;
