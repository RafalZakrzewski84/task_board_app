/** @format */

import { useState, useEffect } from 'react';
import Picker from '@emoji-mart/react';

import { Box, Typography } from '@mui/material';

const EmojiPicker = (props) => {
	const [selectedEmoji, setSelectedEmoji] = useState();
	const [isShowPicker, setIsShowPicker] = useState(false);

	useEffect(() => {
		setSelectedEmoji(props.icon);
	}, [props.icon]);

	const selectEmoji = (e) => {
		const emojiSymbols = e.unified.split('-');
		let codeArray = [];
		emojiSymbols.forEach((symbol) => codeArray.push('0x' + symbol));
		const emoji = String.fromCodePoint(...codeArray);
		setIsShowPicker(false);
		props.onChange(emoji);
	};

	const showPicker = () => {
		setIsShowPicker(!isShowPicker);
	};

	return (
		<Box sx={{ position: 'relative', width: 'max-content' }}>
			<Typography
				variant="h3"
				fontWeight="700"
				sx={{ cursor: 'pointer' }}
				onClick={showPicker}>
				{selectedEmoji}
			</Typography>
			<Box
				sx={{
					display: isShowPicker ? 'block' : 'none',
					position: 'absolute',
					top: '100%',
					zIndex: '9999',
				}}>
				<Picker theme="dark" onEmojiSelect={selectEmoji} showPreview={false} />
			</Box>
		</Box>
	);
};

export default EmojiPicker;
