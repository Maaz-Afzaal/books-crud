const mongoose = require("mongoose");
const connectMongo = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_DATABASE_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		// const db = mongoose.connection;
		// db.on('error', error =>
		// 	console.log(error)
		// );
		// db.once('open', () =>
		// 	console.log('connected to Mongo db')
		// );
	} catch (err) {
		console.log("Mongo DB Connection Error:", err);
		//process.exit(1)
	}
};

const disconnectMongo = async () => {
	try {
		mongoose.disconnect();
	} catch (error) {
		console.log(error);
	}
};
module.exports = { connectMongo, disconnectMongo };
