/** @format */

const Board = require('../models/board');
const Section = require('../models/section');
const Task = require('../models/task');

exports.createBoard = async (req, res) => {
	try {
		const boardCount = await Board.find().count();
		const board = await Board.create({
			user: req.user._id,
			position: boardCount > 0 ? boardCount : 0,
		});
		res.status(201).json(board);
	} catch (error) {
		res.status(500).json(error);
	}
};

exports.getAllBoards = async (req, res) => {
	try {
		const boards = await Board.find({ user: req.user._id }).sort('-position');
		res.status(201).json(boards);
	} catch (error) {
		res.status(500).json(error);
	}
};

exports.updateBoardPosition = async (req, res) => {
	const { boards } = req.body;
	try {
		for (const key in boards.reverse()) {
			const board = boards[key];
			await Board.findByIdAndUpdate(board._id, { $set: { position: key } });
		}
		res.status(201).json(boards);
	} catch (error) {
		res.status(500).json(error);
	}
};

exports.getOneBoard = async (req, res) => {
	const { boardId } = req.params;
	console.log(boardId);
	try {
		const board = await Board.findOne({ user: req.user._id, _id: boardId });
		if (!board) return res.status(404).json('Board not found');

		const sections = await Section.find({ board: boardId });
		for (const section of sections) {
			const tasks = await Task.find({ section: section.id })
				.populate('section')
				.sort('-position');
			section._doc.tasks = tasks;
		}
		board._doc.sections = sections;
		res.status(201).json(board);
	} catch (error) {
		res.status(500).json(error);
	}
};

exports.updateBoard = async (req, res) => {
	const { boardId } = req.params;
	const { title, description, favorite } = req.body;

	try {
		if (title === '') req.body.title = 'undefined';
		if (description === '') req.body.description = 'Add description here';
		const currentBoard = await Board.findById(boardId);

		if (!currentBoard) return res.stats(404).json('Board not found');

		let favorites;
		if (favorite !== undefined && currentBoard.favorite !== favorite) {
			favorites = await Board.find({
				user: currentBoard.user,
				favorite: true,
				_id: { $ne: boardId },
			}).sort('favoritePosition');
		}

		if (favorite) {
			req.body.favoritePosition = favorites.length > 0 ? favorites.length : 0;
		} else {
			for (const key in favorites) {
				const element = favorites[key];
				await Board.findByIdAndUpdate(element.id, {
					$set: { favoritePosition: key },
				});
			}
		}
		const board = await Board.findByIdAndUpdate(boardId, { $set: req.body });

		res.status(200).json(board);
	} catch (error) {
		res.status(500).json(error);
	}
};

exports.getFavoriteBoards = async (req, res) => {
	try {
		const favoriteBoards = await Board.find({
			user: req.user._id,
			favorite: true,
		}).sort('-favoritePosition');
		res.status(200).json(favoriteBoards);
	} catch (error) {
		res.stats(500).json(error);
	}
};

exports.updateFavoritePosition = async (req, res) => {
	const { boards } = req.body;
	try {
		for (const key in boards.reverse()) {
			const board = boards[key];
			await Board.findByIdAndUpdate(board._id, {
				$set: { favoritePosition: key },
			});
		}
		res.status(201).json(boards);
	} catch (error) {
		res.status(500).json(error);
	}
};

exports.deleteBoard = async (req, res) => {
	const { boardId } = req.params;
	console.log(boardId);

	try {
		const sections = await Section.find({ board: boardId });
		for (const section of sections) {
			await Task.deleteMany({ section: section.id });
		}
		await Section.deleteMany({ board: boardId });

		const currentBoard = await Board.findById(boardId);
		console.log(currentBoard);

		if (currentBoard.favorite) {
			const favorites = await Board.find({
				user: currentBoard.user,
				favorite: true,
				_id: { $ne: boardId },
			}).sort('favoritePosition');

			for (const key in favorites) {
				const favorite = favorites[key];
				await Board.findByIdAndUpdate(favorite._id, {
					$set: { favoritePosition: key },
				});
			}
		}

		await Board.findByIdAndDelete(boardId);

		const boards = await Board.find().sort('position');
		console.log(boards);

		for (const key in boards) {
			const board = boards[key];
			await Board.findByIdAndUpdate(board._id, { $set: { position: key } });
		}

		res.status(201).json('Board Deleted');
	} catch (error) {
		res.status(500).json(error);
	}
};
