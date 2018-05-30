const express = require('express');
const Router = express.Router();

const { Book } = require('../models/Book');

Router.use((req, res, next) => {
	next();
});

Router.get('/', (req, res) => {
	const skip = parseInt(req.query.skip);
	const limit = parseInt(req.query.limit);
	const order = req.query.order;

	Book.find().skip(skip).sort({ _id: order }).limit(limit).exec((err, doc) => {
		if (err) {
			return res.status(400).send(err);
		}

		res.send(doc);
	});
});

Router.get('/book', (req, res) => {
	const id = req.query.id;
	Book.findById(id, (err, doc) => {
		if (err) {
			return res.status(400).send(err);
		}

		res.send(doc);
	});
});

Router.post('/book', (req, res) => {
	const book = new Book(req.body);
	book.save((err, doc) => {
		if (err) {
			return res.status(400).send(err);
		}

		res.status(200).json({
			post: true,
			bookId: doc._id
		});
	});
});

Router.post('/updatebook', (req, res) => {
	Book.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, doc) => {
		if (err) {
			return res.status(400).send(err);
		}
		res.json({
			success: true,
			data: doc
		});
	});
});

Router.delete('/deletebook', (req, res) => {
	const id = req.query.id;
	Book.findByIdAndRemove(id, (err, doc) => {
		if (err) {
			return res.status(400).send(err);
		}

		res.json(true);
	});
});

module.exports = Router;
