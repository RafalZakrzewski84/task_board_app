/** @format */

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
	Box,
	IconButton,
	TextField,
	Typography,
	Button,
	Divider,
} from '@mui/material';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutline';

import boardsApi from '../api/boardsApi';
import { setBoards } from '../redux/features/boardSlice';
import { setFavorites } from '../redux/features/favoritesSlice';
import EmojiPicker from '../components/common/EmojiPicker';

let timer;
const TIMEOUT = 500;

const Board = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { boardId } = useParams();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [sections, setSections] = useState([]);
	const [isFavorite, setIsFavorite] = useState(false);
	const [icon, setIcon] = useState('');

	const boards = useSelector((state) => state.boards.value);
	const favoriteBoards = useSelector((state) => state.favorites.value);

	useEffect(() => {
		const getBoard = async () => {
			try {
				const res = await boardsApi.getOneBoard(boardId);
				setTitle(res.title);
				setDescription(res.description);
				setSections([...res.sections]);
				setIsFavorite(res.favorite);
				setIcon(res.icon);
			} catch (error) {
				console.log(error);
			}
		};
		getBoard();
	}, [boardId]);

	const onIconChange = async (newIcon) => {
		setIcon(newIcon);
		const tempBoards = [...boards];
		const index = tempBoards.findIndex((board) => board._id === boardId);
		tempBoards[index] = { ...tempBoards[index], icon: newIcon };
		dispatch(setBoards(tempBoards));

		if (isFavorite) {
			const tempFavorites = [...favoriteBoards];
			const favoriteIndex = tempFavorites.findIndex(
				(favorite) => favorite._id === boardId
			);
			tempFavorites[favoriteIndex] = {
				...tempFavorites[favoriteIndex],
				icon: newIcon,
			};
			dispatch(setFavorites(tempFavorites));
		}

		try {
			await boardsApi.updateBoard(boardId, { icon: newIcon });
		} catch (error) {
			console.log(error);
		}
	};

	const updateTitle = (e) => {
		clearTimeout(timer);
		const newTitle = e.target.value;
		setTitle(newTitle);
		const tempBoards = [...boards];
		const index = tempBoards.findIndex((board) => board._id === boardId);
		tempBoards[index] = { ...tempBoards[index], title: newTitle };
		dispatch(setBoards(tempBoards));

		if (isFavorite) {
			const tempFavorites = [...favoriteBoards];
			const favoriteIndex = tempFavorites.findIndex(
				(favorite) => favorite._id === boardId
			);
			tempFavorites[favoriteIndex] = {
				...tempFavorites[favoriteIndex],
				title: newTitle,
			};
			dispatch(setFavorites(tempFavorites));
		}

		timer = setTimeout(async () => {
			try {
				await boardsApi.updateBoard(boardId, { title: newTitle });
			} catch (error) {
				console.log(error);
			}
		}, TIMEOUT);
	};

	const updateDescription = (e) => {
		clearTimeout(timer);
		const newDescription = e.target.value;
		setDescription(newDescription);
		const tempBoards = [...boards];
		const index = tempBoards.findIndex((board) => board._id === boardId);
		tempBoards[index] = { ...tempBoards[index], description: newDescription };
		dispatch(setBoards(tempBoards));

		timer = setTimeout(async () => {
			try {
				await boardsApi.updateBoard(boardId, { description: newDescription });
			} catch (error) {
				console.log(error);
			}
		}, TIMEOUT);
	};

	const deleteBoard = async () => {
		try {
			await boardsApi.deleteBoard(boardId);

			if (isFavorite) {
				const newFavorites = favoriteBoards.filter(
					(favorite) => favorite._id !== boardId
				);
				dispatch(setFavorites(newFavorites));
			}

			const newBoardsCollection = boards.filter(
				(board) => board._id !== boardId
			);
			if (newBoardsCollection.length === 0) {
				navigate('/boards');
			} else {
				navigate(`/boards/${newBoardsCollection[0]._id}`);
			}

			dispatch(setBoards(newBoardsCollection));
		} catch (error) {
			console.log(error);
		}
	};

	const updateFavorite = async (e) => {
		try {
			const board = await boardsApi.updateBoard(boardId, {
				favorite: !isFavorite,
			});
			let newFavorites = [...favoriteBoards];

			if (isFavorite) {
				newFavorites = newFavorites.filter(
					(favorite) => favorite._id !== boardId
				);
			} else {
				newFavorites.unshift(board);
			}
			dispatch(setFavorites(newFavorites));
			setIsFavorite(!isFavorite);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					width: '100%',
				}}>
				<IconButton variant="outlined" onClick={updateFavorite}>
					{isFavorite ? (
						<StarOutlinedIcon color="warning" />
					) : (
						<StarBorderOutlinedIcon />
					)}
				</IconButton>
				<IconButton variant="outlined" color="error" onClick={deleteBoard}>
					<DeleteOutlinedIcon />
				</IconButton>
			</Box>
			<Box sx={{ padding: '10px 50px' }}>
				<Box>
					<EmojiPicker icon={icon} onChange={onIconChange} />
					<TextField
						value={title}
						onChange={updateTitle}
						placeholder="Untitled"
						variant="outlined"
						fullWidth
						sx={{
							'& .MuiOutlinedInput-input': { padding: 0 },
							'& .MuiOutlinedInput-notchedOutline': { border: 'none' },
							'& .MuiOutlinedInput-root': {
								fontSize: '2rem',
								fontWeight: '700',
							},
						}}
					/>
					<TextField
						value={description}
						onChange={updateDescription}
						placeholder="Add a description"
						variant="outlined"
						multiline
						fullWidth
						sx={{
							'& .MuiOutlinedInput-input': { padding: 0 },
							'& .MuiOutlinedInput-notchedOutline': { border: 'none' },
							'& .MuiOutlinedInput-root': { fontSize: '0.8rem' },
						}}
					/>
				</Box>

				<Box>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}>
						<Button>Add Section</Button>
						<Typography variant="body2" fontWeight="700">
							{sections.length} Sections
						</Typography>
					</Box>
				</Box>
				<Divider sx={{ margin: '10px 0' }} />
				{/* taskboard */}
			</Box>
		</>
	);
};

export default Board;
