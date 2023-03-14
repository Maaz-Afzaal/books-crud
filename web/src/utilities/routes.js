import { Navigate } from "react-router-dom";
import AddEditBook from "../components/AddEditBook";
import Books from "../components/Books";

export const PathName = {
	MAIN: "/",
	BOOKS: "/books",
	ADD_BOOK: "/add-book",
};

export const MainRoutes = Object.freeze({
	[PathName.MAIN]: Object.freeze({
		pathname: PathName.MAIN,
		exact: true,
		component: <Navigate to="/books" />,
	}),
	[PathName.BOOKS]: Object.freeze({
		pathname: PathName.BOOKS,
		exact: true,
		component: <Books />,
		param: "id",
		paramComponent: <>com</>,
	}),
	[PathName.ADD_BOOK]: Object.freeze({
		pathname: PathName.ADD_BOOK,
		exact: true,
		component: <AddEditBook />,
		param: "id",
		paramComponent: <AddEditBook />,
	}),
});
