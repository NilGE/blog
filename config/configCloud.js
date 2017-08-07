const env = process.env;

module.exports = {
	mongodbUri: 'mongodb://neilge:Gxy660909@ds129183.mlab.com:29183/blog',
	port: env.PORT || 8080,
	host: env.HOST || 'localhost',
	serverUrl: function() {
		return `http://${this.host}:${this.port}`;
	}
};
