import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainRoutes } from "./utilities/routes";

function App() {
	return (
		<>
			<Router>
				<Routes>
					<>
						{Object.values(MainRoutes).map((route, index) => {
							return (
								<>
									{route.component && (
										<>
											<Route
												exact={route.exact}
												path={route.pathname}
												element={route.component}
											/>
										</>
									)}
									{route.param && (
										<>
											<Route
												exact={true}
												path={`${route.pathname}/:${route.param}`}
												element={route.paramComponent}
											/>
										</>
									)}
								</>
							);
						})}
					</>
				</Routes>
			</Router>
		</>
	);
}

export default App;
