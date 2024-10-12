import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/quiz" element={<Quiz />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
