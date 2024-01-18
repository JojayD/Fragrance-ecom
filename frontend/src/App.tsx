	import "./App.css";
	import { useUserContext } from "../context/UserProvider";
	import Cart from "./Components/Frontpage/Cart";
	import "bootstrap/dist/css/bootstrap.min.css";
	import { Route, Routes } from "react-router-dom";
	import Search from "./Components/Frontpage/Search";
	import LandingPage from "./Components/Frontpage/LandingPage";
	import { useState, useEffect } from "react";
	import axios from "axios";
	import FragranceCardWrapper from "./Components/Frontpage/FragranceCardWrapper";
	import SignUpForm from "./Components/Frontpage/SignUpForm";

	interface Fragrance {
		Name: string;
		Brand: string;
		Description: string;
		Notes: string;
		ImageURL: string;
		Price: number;
		Id: string;
		Quantity: number;
	}

	export default function App() {
		const { headerSearchBar } = useUserContext();
		const [listOfFragrances, setListOfFragrances] = useState<Fragrance[]>([]);

		useEffect(() => {
			fetchData();
		}, []);

		// useEffect(() => {
		// 	console.log("Current listOfFragrances state:", listOfFragrances);
		// }, [listOfFragrances]);

		async function fetchData() {
			
			try {
				const response = await axios.get("/api/get_data");
				console.log("Data fetched from API:", response.data);
				setListOfFragrances(JSON.parse(response.data));
				// localStorage.setItem("fragranceData", JSON.stringify(response.data));
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}

		return (
			<div className="container">
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
						path='/Search'
						element={
							<Search
								listOfFragrances={listOfFragrances}
								headerSearchBar={headerSearchBar}
							/>
						}
					/>
					<Route
						path='/Cart'
						element={<Cart />}
					/>

					<Route
						path='/fragrance-detail/:id'
						element={<FragranceCardWrapper listOfFragrances={listOfFragrances} />}
					/>

					<Route
						path="/Sign-up"
						element = {<SignUpForm/>}
					/>
				</Routes>
			</div>
		);
	}
