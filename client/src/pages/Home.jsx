/** @format */
import { Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

const Home = () => {
	const createBoard = () => {};
	return (
		<Box
			sx={{
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}>
			<LoadingButton variant="outlined" color="success" onClick={createBoard}>
				Click here to create your first board
			</LoadingButton>
		</Box>
	);
};

export default Home;
