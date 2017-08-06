const env = process.env;

export const nodeEnv = env.NODE_ENV || 'development';

export const logStars = function(message) {
	console.info('*******');
	console.info(message);
	console.info('*******');
};

export default {
	mongodbUri: 'mongodb://neilge:Gxy660909@ds129183.mlab.com:29183/blog',
	port: env.PORT || 8080,
	host: env.HOST || 'localhost',
	get serverUrl() {
		return `http://${this.host}:${this.port}`;
	}
};
