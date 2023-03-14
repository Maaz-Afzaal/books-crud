const BooksModel = require("../models/Books.model");
const response = require("../utilities/response");

const listBooks = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await BooksModel.find();
		response.success(res, undefined, result, "Books fetched successfully");
	} catch (error) {
		return response.requestfailure(res, undefined, error);
	}
};

const getBookyId = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await BooksModel.findById(id);
		response.success(res, undefined, result, "Book fetched successfully");
	} catch (error) {
		return response.requestfailure(res, undefined, error);
	}
};

const createBook = async (req, res) => {
	try {
		// const { name , author , publishedOn } = req.body;

		const result = await BooksModel.create({
			...req.body,
		});
		response.success(res, undefined, result, "Book created successfully");
	} catch (error) {
		return response.requestfailure(res, undefined, error);
	}
};

const updateBook = async (req, res) => {
	try {
		const { name } = req.body;
		const { id: bookId } = req.params;

		const result = await BooksModel.findOneAndUpdate(
			{
				_id: bookId,
			},
			{
				...req.body,
			},
			{ new: true },
		);
		response.success(res, undefined, result, "Book updated successfully");
	} catch (error) {
		return response.requestfailure(res, undefined, error);
	}
};

const deleteBook = async (req, res) => {
	try {
		const { id } = req.params;

		const result = await BooksModel.findOneAndDelete({
			_id: id,
		});

		if (!result?._id) throw new Error("Data not found ");

		response.success(res, undefined, result, "Book deleted successfully");
	} catch (error) {
		return response.requestfailure(res, undefined, error);
	}
};

module.exports = {
	listBooks,
	getBookyId,
	createBook,
	updateBook,
	deleteBook,
};
