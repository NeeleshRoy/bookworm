const config = {
	production: {
		SECRET: process.env.SECRET,
		DATABASE: process.env.MONGODB_URI
	},
	default: {
		SECRET: 'SUPERSECRETPASS123',
		DATABASE: 'mongodb://localhost:27017/bookworm'
	}
};

exports.get = function get(env) {
	return config[env] || config.default;
};
