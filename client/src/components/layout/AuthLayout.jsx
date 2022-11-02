/** @format */

import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Container, Box } from '@mui/material';

import authUtils from '../../utils/authUtils';
import Loading from '../common/Loading';
import assets from '../../assets/index';

const AuthLayout = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			const isAuth = await authUtils.isAuthenticated();
			if (!isAuth) {
				setLoading(false);
			} else {
				navigate('/');
			}
		};
		checkAuth();
	}, [navigate]);

	return loading ? (
		<Loading fullHeight />
	) : (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'column',
				}}>
				<img
					src={assets.images.logoDark}
					style={{ width: '200px' }}
					alt="app Logo"
				/>
				<Outlet />
			</Box>
		</Container>
	);
};

export default AuthLayout;
