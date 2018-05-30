const express = require('express');
const Router = express.Router();

const { User } = require('../models/User');
const { Book } = require('../models/Book');
const { auth } = require('../middleware/auth');

Router.use((req, res, next) => {
	next();
});

Router.get('/users', (req, res) => {
	User.find({}, (err, users) => {
		if (err) return res.json({ success: false });
		res.status(200).send(users);
	});
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

Router.get(
	'/logout',
	(req, res, next) => {
		auth(req, res, next);
	},
	(req, res) => {
		res.send(req.user);
	}
);

Router.get('/reviewer', (req, res) => {
	const id = req.query.id;

	User.findById(id, (err, doc) => {
		if (err) return res.status(404).send(err);
		res.json({ name: doc.name, lastname: doc.lastname });
	});
});

Router.get('/reviews', (req, res) => {
	Book.find({ ownerId: req.query.user }).exec((err, docs) => {
		if (err) return res.status(404).send(err);
		res.send(docs);
	});
});

module.exports = Router;
