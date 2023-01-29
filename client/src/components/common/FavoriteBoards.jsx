/** @format */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import { ListItem, ListItemButton, Box, Typography } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import boardsApi from '../../api/boardsApi';
import { setFavorites } from '../../redux/features/favoritesSlice';

const FavoriteBoards = () => {
	const dispatch = useDispatch();
	const favoriteBoards = useSelector((state) => state.favorites.value);
	const [activeFavoriteIndex, setActiveFavoriteIndex] = useState(0);
	const { boardId } = useParams();

	useEffect(() => {
		const getFavoriteBoards = async () => {
			try {
				const res = await boardsApi.getFavoriteBoards();
				dispatch(setFavorites(res));
			} catch (error) {
				console.log(error);
			}
		};
		getFavoriteBoards();
	}, [dispatch]);

	useEffect(() => {
		const favoriteIndex = favoriteBoards.findIndex(
			(favorite) => favorite._id === boardId
		);
		setActiveFavoriteIndex(favoriteIndex);
	}, [favoriteBoards, boardId]);

	const onDragEnd = async ({ source, destination }) => {
		const newFavoriteList = [...favoriteBoards];
		const [removed] = newFavoriteList.splice(source.index, 1);
		newFavoriteList.splice(destination.index, 0, removed);

		const activeBoard = newFavoriteList.findIndex(
			(board) => board._id === boardId
		);
		setActiveFavoriteIndex(activeBoard);
		dispatch(setFavorites(newFavoriteList));

		try {
			await boardsApi.updateFavoritePosition({ boards: newFavoriteList });
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
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
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable
					key={'list-board-droppable'}
					droppableId={'list-board-droppable'}>
					{(provided) => (
						<div ref={provided.innerRef} {...provided.droppableProps}>
							{favoriteBoards.map((board, idx) => (
								<Draggable key={board._id} draggableId={board._id} index={idx}>
									{(provided, snapshot) => (
										<ListItemButton
											ref={provided.innerRef}
											{...provided.dragHandleProps}
											{...provided.draggableProps}
											selected={idx === activeFavoriteIndex}
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
		</>
	);
};

export default FavoriteBoards;
