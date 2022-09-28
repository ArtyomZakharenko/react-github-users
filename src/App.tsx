import { AuthWrapper, Dashboard, Error, Login, PrivateRoute } from "./pages";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
	return (
		<AuthWrapper>
			<Router>
				<Routes>
					<Route path="/" element={
						<PrivateRoute>
							<Dashboard/>
						</PrivateRoute>
					}/>
					<Route path="login" element={<Login/>}/>
					<Route path="*" element={<Error/>}/>
				</Routes>
			</Router>
		</AuthWrapper>
	);
}

export default App;
