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
	console.log('board in controller', boards);
	try {
		for (const key in boards.reverse()) {
			const board = boards[key];
			await Board.findByIdAndUpdate(board.id, { $set: { position: key } });
		}
		console.log('positions updated msg from boars controller');
		res.status(201).json(boards);
	} catch (error) {
		res.status(500).json(error);
	}
};
