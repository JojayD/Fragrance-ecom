import "./App.css";
import { useUserContext } from "../context/UserProvider";
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
	ImageURL: string;
}

export default function App() {
	const { headerSearchBar } = useUserContext();
	const [listOfFragrances, setListOfFragrances] = useState<Fragrance[]>([]);
	
	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		console.log("Current listOfFragrances state:", listOfFragrances);
	}, [listOfFragrances]);


	async function fetchData() {
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
				<Route
					path="/Search"
					element={<Search listOfFragrances={listOfFragrances} headerSearchBar = {headerSearchBar}/>}
				/>
			</Routes>
		</div>
	);
}
