const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		nev: {
			type: String,
			require: true,
		},
		email: {
			type: String,
			require: true,
		},
		jelszo: {
			type: String,
			require: true,
		},
		avatar: {
			type: String,
			require: true,
		},
		admin: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;