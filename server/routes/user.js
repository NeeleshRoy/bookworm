const express = require('express');
const Router = express.Router();

const { User } = require('../models/User');

Router.use((req, res, next) => {
	next();
});

Router.post('/register', (req, res) => {
	const user = new User(req.body);

	user.save((err, doc) => {
		if (err) return res.json({ success: false });
		res.json({
			success: true,
			id: doc._id
		});
	});
});

module.exports = Router;
