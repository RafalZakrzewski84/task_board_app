/** @format */

import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import {
	Drawer,
	List,
	Box,
	IconButton,
	ListItem,
	Typography,
	ListItemButton,
} from '@mui/material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import assets from '../../assets/index';
import boardsApi from '../../api/boardsApi';
import { setBoards } from '../../redux/features/boardSlice';

const Sidebar = () => {
	const user = useSelector((state) => state.user.value);
	const boards = useSelector((state) => state.boards.value);
	const navigate = useNavigate();
	const { boardId } = useParams();
	const dispatch = useDispatch();
	const [activeBoardIndex, setActiveBoardIndex] = useState(0);
	const sidebarWidth = 250;

	useEffect(() => {
		const getBoards = async () => {
			try {
				const res = await boardsApi.getAllBoards();
				dispatch(setBoards(res));
			} catch (err) {
				console.log(err);
			}
		};
		getBoards();
	}, [dispatch]);

	useEffect(() => {
		const activeBoard = boards.findIndex((board) => board._id === boardId);
		setActiveBoardIndex(activeBoard);
		if (boards.length > 0 && boardId === undefined) {
			navigate(`/boards/${boards[0]._id}`);
		}
	}, [boards, boardId, navigate]);

	const logout = () => {
		localStorage.removeItem('token');
		navigate('/login');
	};

	const onDragEnd = async ({ source, destination }) => {
		const newBoardsList = [...boards];
		const [removed] = newBoardsList.splice(source.index, 1);
		newBoardsList.splice(destination.index, 0, removed);

		const activeBoard = newBoardsList.findIndex(
			(board) => board._id === boardId
		);
		setActiveBoardIndex(activeBoard);
		dispatch(setBoards(newBoardsList));

		try {
			console.log('original boards', boards);
			console.log('newBoardsList', newBoardsList);
			await boardsApi.updateBoardPosition({ boards: newBoardsList });
			console.log('new list sent to db through');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Drawer
			container={window.document.body}
			variant="permanent"
			open={true}
			sx={{
				width: sidebarWidth,
				height: '100vh',
				'& > div': { borderRight: 'none' },
			}}>
			<List
				disablePadding
				sx={{
					width: sidebarWidth,
					height: '100vh',
					backgroundColor: assets.colors.secondary,
				}}>
				<ListItem>
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}>
						<Typography variant="body2" fontWeight="700">
							{user.username}
						</Typography>
						<IconButton onClick={logout}>
							<LogoutOutlinedIcon fontSize="small" />
						</IconButton>
					</Box>
				</ListItem>
				<Box sx={{ paddingTop: '10px' }} />
				<ListItem>
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}>
						<Typography variant="body2" fontWeight="700">
							Favorite
						</Typography>
					</Box>
				</ListItem>
				<ListItem>
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}>
						<Typography variant="body2" fontWeight="700">
							Privet
						</Typography>
						<IconButton>
							<AddBoxOutlinedIcon fontSize="small" />
						</IconButton>
					</Box>
				</ListItem>
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable
						key={'list-board-droppable'}
						droppableId={'list-board-droppable'}>
						{(provided) => (
							<div ref={provided.innerRef} {...provided.droppableProps}>
								{boards.map((board, idx) => (
									<Draggable
										key={board._id}
										draggableId={board._id}
										index={idx}>
										{(provided, snapshot) => (
											<ListItemButton
												ref={provided.innerRef}
												{...provided.dragHandleProps}
												{...provided.draggableProps}
												selected={idx === activeBoardIndex}
												component={Link}
												to={`/boards/${board._id}`}
												sx={{
													pl: '20px',
													cursor: snapshot.isDragging
														? 'grab'
														: 'pointer!important',
												}}>
												<Typography
													variant="body2"
													fontWeight="700"
													sx={{
														whiteSpace: 'nowrap',
														overflow: 'hidden',
														textOverflow: 'ellipsis',
													}}>
													{board.icon} {board.title}
												</Typography>
											</ListItemButton>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</List>
		</Drawer>
	);
};

export default Sidebar;
