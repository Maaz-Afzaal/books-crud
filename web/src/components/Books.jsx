import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";

import { deleteBook, fetchBooks } from "../api/books.api";
import Button from "./subcomponents/Button";
import { useNavigate } from "react-router-dom";
import { notifyError } from "../utilities/toastify";

export default function Books() {
	const navigate = useNavigate();

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const fetchBooksList = async () => {
		const { result, error } = await fetchBooks();
		if (error) {
			setError(error.message ?? "Failed to get books list");
			setTimeout(() => {
				setError("");
			}, 3000);
			return;
		}
		setData(result.data);
		setLoading(false);
	};

	const onRowDelete = async (id) => {
		const { result, error } = await deleteBook(id);

		if (error) {
			setError(error.message ?? "Failed to delete book");
			setTimeout(() => {
				setError("");
			}, 3000);
		}
		fetchBooksList();
	};

	const onRowEdit = (id) => {
		navigate(`/add-book/${id}`);
	};

	useEffect(() => {
		fetchBooksList();
	}, []);

	const columns = [
		{
			name: "Book",
			selector: (row) => row.name,
			wrap: true,
		},
		{
			name: "Author",
			selector: (row) => row.author,
			wrap: true,
		},
		{
			name: "Published Date",
			selector: (row) => row.publishedOn,
			wrap: true,
		},
		{
			name: "Action",
			selector: (row) => row.action,
			wrap: true,
		},
	];

	const table_data = data?.map((book, index) => {
		return {
			index: index,
			name: book.name,
			author: book.author,
			publishedOn: new Date(book.publishedOn).toLocaleDateString(),
			action: (
				<>
					<div className="d-flex ">
						<div
							className="pointer"
							onClick={() => {
								onRowEdit(book._id);
							}}
						>
							<i className="fa fa-pen"></i>
						</div>
						<div
							className="pointer ms-3"
							onClick={() => {
								onRowDelete(book._id);
							}}
						>
							<i className="fa fa-trash"></i>
						</div>
					</div>
				</>
			),
		};
	});

	const customStyles = {
		headCells: {
			style: {
				backgroundColor: "#a28089",
				color: "white",
				justifyContent: "center",
			},
		},
		cells: {
			style: {
				justifyContent: "center",
				textAlign: "center",
			},
		},
	};

	const conditionalRowStyles = [
		{
			when: (row) => row,
			style: {
				borderWidth: "0px",
			},
		},
		{
			when: (row) => row.index % 2 === 1,
			style: {
				backgroundColor: "#f8f8f8",
				borderWidth: "0px",
			},
		},
	];
	return (
		<>
			<div className="px-5 py-3">
				<div className="py-3 w-100 d-flex justify-content-between">
					<span className="font-600-20 primary">Books</span>
					<Button
						onClick={() => {
							navigate("/add-book");
						}}
						label={"+ Add Book"}
					/>
				</div>
				<span>
					<DataTable
						pagination
						columns={columns}
						data={table_data}
						customStyles={customStyles}
						conditionalRowStyles={conditionalRowStyles}
					/>
				</span>
				{error && (
					<>
						<div className="error-container mt-3">{error}</div>
					</>
				)}
			</div>
		</>
	);
}
