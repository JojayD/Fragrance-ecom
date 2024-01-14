import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FragranceCard from "./FragranceCard";
import styles from "/frontend/src/Styles/FragranceWrapper.module.css";
import Header from "./Header";
import Recommender from "./Recommender";
type Props = {
	listOfFragrances: Fragrance[];
};

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

export default function FragranceCardWrapper({ listOfFragrances }: Props) {
	let { id } = useParams();
	const [fragranceData, setFragranceData] = useState<Fragrance>();

	useEffect(() => {
		const fragrance = listOfFragrances.find((f) => f.Id == id);
		setFragranceData(fragrance);
	}, [id, listOfFragrances]);

	if (!fragranceData) {
		return <div>Loading fragrance details...</div>;
	}

	return (
		<>
			<Header />
			<div className={styles["container__fragrance-wrapper"]}>
				<FragranceCard
					isDynamic={true}
					data={fragranceData}
				/>
			</div>
			<div>
				<Recommender
					listOfFragrances={listOfFragrances}
					data={fragranceData}
				/>
			</div>
		</>
	);
}
