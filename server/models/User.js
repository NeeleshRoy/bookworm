const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config').get(process.env.NODE_ENV);
const SALT = 10;

const userSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		unique: 1
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	name: {
		type: String,
		maxlength: 100
	},
	lastname: {
		type: String,
		maxlength: 100
	},
	role: {
		type: Number,
		default: 0
	},
	token: {
		type: String
	}
});

userSchema.pre('save', function(next) {
	const user = this;

	if (user.isModified('password')) {
		bcrypt.genSalt(SALT, function(err, salt) {
			if (err) {
				console.log(err);
				return next(err);
			}

			bcrypt.hash(user.password, salt, function(err, hash) {
				if (err) {
					console.log(err);
					return next(err);
				}
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
	console.log(candidatePassword, this.password);
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

userSchema.methods.generateToken = function(cb) {
	const user = this;
	const token = jwt.sign(user._id.toHexString(), config.SECRET);

	user.token = token;

	user.save(function(err, user) {
		if (err) return cb(err);
		cb(null, user);
	});
};

const User = mongoose.model('User', userSchema);

module.exports = {
	User
};
