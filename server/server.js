const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

const { User } = require('./models/User');
const { Book } = require('./models/Book');

app.use(bodyParser.json());
app.use(cookieParser());

//GET
app.get('/api/getbook', (req, res) => {
	const id = req.query.id;
	Book.findById(id, (err, doc) => {
		if (err) {
			return res.status(400).send(err);
		}

		res.send(doc);
	});
});

//POST
app.post('/api/book', (req, res) => {
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

//UPDATE

//DELETE

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log('server running');
});
