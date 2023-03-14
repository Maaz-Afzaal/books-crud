import { apiCall } from "./axios/axios-config";

const fetchBooks = async (id) => {
	let url = "books";
	const response = await apiCall({
		url: url,
		method: "get",
	});
	return response;
};

const fetchBookById = async (id) => {
	const response = await apiCall({
		url: `books/${id}`,
		method: "get",
	});
	return response;
};

const deleteBook = async (id) => {
	const response = await apiCall({
		url: `books/${id}`,
		method: "delete",
	});
	return response;
};

const createBook = async (data) => {
	const response = await apiCall({
		url: `books`,
		method: "post",
		data,
	});
	return response;
};

const updateBook = async (id, data) => {
	const response = await apiCall({
		url: `books/${id}`,
		method: "patch",
		data,
	});
	return response;
};
export { fetchBooks, deleteBook, fetchBookById, createBook, updateBook };
