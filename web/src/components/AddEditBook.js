import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createBook, fetchBookById, updateBook } from "../api/books.api";
import { Form, InputGroup } from "react-bootstrap";
import Button from "./subcomponents/Button";

export default function AddEditBook() {
	const param = useParams();

	const navigate = useNavigate();

	const [values, setValues] = useState({
		name: "",
		author: "",
		publishedOn: null,
	});
	const [error, setError] = useState("");

	const onChange = (e) => {
		const { name, value } = e.target;
		setValues((val) => {
			return { ...val, [name]: value };
		});
	};

	const fetchBookDetails = async () => {
		const { result, error } = await fetchBookById(param.id);
		if (error) {
			setError(error.message ?? "Failed to fetch book details");
				param.id = undefined;

			setTimeout(() => {
				setError("");
			}, 3000);
			return;
		}
		let myDate = new Date(result.data.publishedOn);

		const options = { year: "numeric", month: "2-digit", day: "2-digit" };

		const formatter = new Intl.DateTimeFormat("en-US", options);

		let formattedDate = formatter.format(myDate).split("/");
		formattedDate =
			formattedDate[2] + "-" + formattedDate[0] + "-" + formattedDate[1];

		setValues({
			name: result?.data?.name,
			author: result?.data?.author,
			publishedOn: formattedDate,
		});
	};

	const submitForm = async () => {
		if (!values.name || !values.author || !values?.publishedOn) {
			alert("Required fields are missing");
		}
		if (!param.id) {
			const { result, error } = await createBook({ ...values });
			if (error) {
				setError(error.message ?? "Failed to create book");
				setTimeout(() => {
					setError("");
				}, 3000);

				return;
			}
			navigate(-1);
		} else {
			const { result, error } = await updateBook(param.id, { ...values });
			if (error) {
				setError(error.message ?? "Failed to update book");
				setTimeout(() => {
					setError("");
				}, 3000);
				return;
			}
			navigate(-1);
		}
	};
	useMemo(() => {
		if (param.id) {
			fetchBookDetails();
		}
	}, [param.id]);

	return (
		<>
			<div className="px-5 py-3">
				<div className="py-3 w-100 d-flex justify-content-between">
					<span className="font-600-20 primary">
						<i
							className="fa fa-arrow-left pointer"
							onClick={() => {
								navigate(-1);
							}}
						></i>{" "}
						{param.id ? "Edit" : "Add"} Book
					</span>
				</div>
				{console.log(values)}
				<Form className="col-md-6">
					<Form.Label className="form-label required">
						Name
					</Form.Label>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<InputGroup className="mb-3">
							<Form.Control
								type="text"
								name="name"
								placeholder="Book Name"
								onChange={onChange}
								value={values.name}
							/>
						</InputGroup>
					</Form.Group>
				</Form>
				<Form className="col-md-6">
					<Form.Label className="form-label required">
						Author
					</Form.Label>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<InputGroup className="mb-3">
							<Form.Control
								type="text"
								name="author"
								placeholder="Author Name"
								onChange={onChange}
								value={values.author}
							/>
						</InputGroup>
					</Form.Group>
				</Form>
				<Form className="col-md-6">
					<Form.Label className="form-label required">
						Published On
					</Form.Label>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<InputGroup className="mb-3">
							<Form.Control
								type="date"
								name="publishedOn"
								placeholder="Book Name"
								onChange={onChange}
								value={values.publishedOn}
							/>
						</InputGroup>
					</Form.Group>
				</Form>
				<Button
					onClick={() => {
						submitForm();
					}}
					label={`${param.id ? "Edit" : "Add"}`}
				/>
				{error && (
					<>
						<div className="error-container mt-3">{error}</div>
					</>
				)}
			</div>
		</>
	);
}
