const mongoose = require("mongoose");
const Schema = mongoose.Schema;

booksSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required."],
			unique: true,
		},
		author: {
			type: String,
			required: [true, "Author is required."],
		},
		publishedOn: {
			type: Date,
			required: [true, "Published date is required."],
		},
	},
	{
		timestamps: true,
	},
);

booksSchema.post("save", function (error, doc, next) {
	if (error.name === "ValidationError") {
		let message = error.message.split(": ");
		message = message[message.length - 1];
		throw new Error(message);
	}
	next();
});

module.exports = mongoose.model("Books", booksSchema);
