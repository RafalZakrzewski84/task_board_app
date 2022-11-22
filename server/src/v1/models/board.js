/** @format */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaOptions = require('./modelOptions');

const boardSchema = Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		icon: {
			type: String,
			default: '📃',
		},
		title: {
			type: String,
			default: 'Untitled',
		},
		description: {
			type: String,
			default: 'Add description here',
		},
		position: {
			type: Number,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
		favoritePosition: {
			type: Number,
			default: 0,
		},
	},
	schemaOptions
);

module.exports = mongoose.model('Board', boardSchema);
