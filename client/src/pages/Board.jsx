/** @format */

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { EmojiPicker } from 'emoji-mart';
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
			} catch (error) {
				console.log(error);
			}
		};
		getBoard();
	}, [boardId]);

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					width: '100%',
				}}>
				<IconButton variant="outlined">
					{isFavorite ? (
						<StarOutlinedIcon color="warning" />
					) : (
						<StarBorderOutlinedIcon />
					)}
				</IconButton>
				<IconButton variant="outlined" color="error">
					<DeleteOutlinedIcon />
				</IconButton>
			</Box>
			<Box sx={{ padding: '10px 50px' }}>
				<Box>
					{/* emoji */}
					<TextField
						value={title}
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
