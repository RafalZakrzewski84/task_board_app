/** @format */

const router = require('express').Router();
const { param } = require('express-validator');
const validation = require('../handlers/validation');
const tokenHandler = require('../handlers/tokenHandler');
const boardController = require('../controllers/boards');

router.post('/', tokenHandler.verifyToken, boardController.createBoard);

router.get('/', tokenHandler.verifyToken, boardController.getAllBoards);

router.put('/', tokenHandler.verifyToken, boardController.updateBoardPosition);

router.get(
	'/favorites',
	tokenHandler.verifyToken,
	boardController.getFavoriteBoards
);

router.put(
	'/favorites',
	tokenHandler.verifyToken,
	boardController.updateFavoritePosition
);

router.get(
	'/:boardId',
	param('boardId').custom((value) => {
		if (!validation.isObjectId(value)) {
			return Promise.reject('Invalid id');
		} else {
			return Promise.resolve();
		}
	}),
	validation.validate,
	tokenHandler.verifyToken,
	boardController.getOneBoard
);

router.put(
	'/:boardId',
	param('boardId').custom((value) => {
		if (!validation.isObjectId(value)) {
			return Promise.reject('Invalid id');
		} else {
			return Promise.resolve();
		}
	}),
	validation.validate,
	tokenHandler.verifyToken,
	boardController.updateBoard
);

router.delete(
	'/:boardId',
	param('boardId').custom((value) => {
		if (!validation.isObjectId(value)) {
			return Promise.reject('Invalid id');
		} else {
			return Promise.resolve();
		}
	}),
	validation.validate,
	tokenHandler.verifyToken,
	boardController.deleteBoard
);

module.exports = router;
