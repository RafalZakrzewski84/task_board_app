/** @format */

import { useSelector, useDispatch } from 'react-redux';
import { Drawer } from '@mui/material';

const Sidebar = () => {
	const user = useSelector((state) => state.user.value);
	const sidebarWidth = 250;

	return (
		<Drawer
			container={window.document.body}
			variant="permanent"
			open={true}
			sx={{
				width: sidebarWidth,
				height: '100%',
				'& > div': { borderRight: 'none' },
			}}></Drawer>
	);
};

export default Sidebar;
