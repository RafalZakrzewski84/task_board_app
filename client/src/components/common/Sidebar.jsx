/** @format */

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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

const Sidebar = () => {
	const user = useSelector((state) => state.user.value);
	const navigate = useNavigate();

	const sidebarWidth = 250;

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
