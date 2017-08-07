const env = process.env;

module.exports = {
	mongodbUri: 'mongodb://localhost:27017/blog-test',
	port: env.PORT || 8080,
	host: env.HOST || 'localhost',
	serverUrl: function() {
		return `http://${this.host}:${this.port}`;
	}
};
