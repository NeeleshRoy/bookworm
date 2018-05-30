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

Router.post('/login', (req, res) => {
	User.findOne({ email: req.body.email }, (err, user) => {
		if (!user) return res.json({ isAuth: false, message: 'Invalid email' });
		user.comparePassword(req.body.password, (err, isMatch) => {
			if (!isMatch) return res.json({ isAuth: false, message: 'Wrong Password' });

			user.generateToken((err, user) => {
				if (err) return res.status(404).send(err);
				res.cookie('auth', user.token).json({
					isAuth: true,
					id: user._id,
					email: user.email
				});
			});
		});
	});
});

module.exports = Router;
