/** @format */

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import {
	Drawer,
	List,
	Box,
	IconButton,
	ListItem,
	Typography,
} from '@mui/material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

import assets from '../../assets/index';
import boardsApi from '../../api/boardsApi';
import { setBoards } from '../../redux/features/boardSlice';

const Sidebar = () => {
	const user = useSelector((state) => state.user.value);
	const boards = useSelector((state) => state.boards.value);
	const navigate = useNavigate();
	const { boardId } = useParams();
	const dispatch = useDispatch();
	const sidebarWidth = 250;

	useEffect(() => {
		const getBoards = async () => {
			try {
				const res = await boardsApi.getAllBoards();
				dispatch(setBoards(res));
				if (res.length > 0 && boardId === undefined) {
					navigate(`/boards/${res[0]._id}`);
				}
			} catch (err) {
				console.log(err);
			}
		};
		getBoards();
	}, []);

	useEffect(() => {
		console.log(boards);
	}, [boards]);

	const logout = () => {
		localStorage.removeItem('token');
		navigate('/login');
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
				<Box sx={{ paddingTop: '10px' }}>
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
				</Box>
			</List>
		</Drawer>
	);
};

export default Sidebar;
