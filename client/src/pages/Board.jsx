/** @format */

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

import boardsApi from '../api/boardsApi';

const Board = () => {
	const { boardId } = useParams();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [sections, setSections] = useState([]);
	const [isFavorite, setIsFavorite] = useState(false);
	const [icon, setIcon] = useState('');

	useEffect(() => {
		const getBoard = async () => {
			try {
				const res = await boardsApi.getOneBoard(boardId);
				setTitle(res.title);
				setDescription(res.description);
				setSections([...res.sections]);
				setIsFavorite(res.favorite);
				setIcon(res.icon);
				console.log(res);
			} catch (error) {
				console.log(error);
			}
		};
		getBoard();
	}, [boardId]);

	return (
		<>
			<Box sx={{}}></Box>
		</>
	);
};

export default Board;
