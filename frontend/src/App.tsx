import "./App.css";
// import Header from "./Components/Frontpage/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Search from "./Components/Frontpage/Search";
import LandingPage from "./Components/Frontpage/LandingPage";
import { useState, useEffect } from "react";
import axios from "axios";
interface Fragrance {
	Name: string;
	Brand: string;
	Description: string;
	Notes: string;
	ImageUrl: string;
}

export default function App() {
	const [listOfFragrances, setListOfFragrances] = useState<Fragrance[]>([]);

	useEffect(() => {
		fetchData();
	}, []);

useEffect(() => {
	console.log("Current listOfFragrances state:", listOfFragrances);
}, [listOfFragrances]);
	async function fetchData() {
		// const storedData = localStorage.getItem("fragranceData");
		// if (storedData) {
		// 	try {
		// 		const stringData = JSON.stringify(storedData)
		// 		const parsedData = JSON.parse(stringData);
		// 		console.log("Parsed data from localStorage:", parsedData);
		// 		setListOfFragrances(parsedData);
		// 	} catch (error) {
		// 		console.error("Error parsing stored data:", error);
		// 		localStorage.removeItem("fragranceData");
		// 	}
		// } else {
		// 	try {
		// 		const response = await axios.get("http://localhost:5001/api/get_data");
		// 		console.log("Data fetched from API:", response.data);
		// 		setListOfFragrances(JSON.parse(response.data));
		// 		localStorage.setItem("fragranceData", JSON.stringify(response.data));
		// 	} catch (error) {
		// 		console.error("Error fetching data:", error);
		// 	}
		// }
			try {
				const response = await axios.get("http://localhost:5001/api/get_data");
				console.log("Data fetched from API:", response.data);
				setListOfFragrances(JSON.parse(response.data));
				localStorage.setItem("fragranceData", JSON.stringify(response.data));
			} catch (error) {
				console.error("Error fetching data:", error);
			}
}

	return (
		<div>
			<Routes>
				<Route
					path='/'
					element={<LandingPage />}
				/>
				<Route
					path={`/Fragrances`}
					element={<Search listOfFragrances={listOfFragrances} />}
				/>
			</Routes>
		</div>
	);
}
