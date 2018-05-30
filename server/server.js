const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();
const { BookRoutes, UserRoutes } = require('./routes');

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/books', BookRoutes);
app.use('/api/user', UserRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log('server running');
});
