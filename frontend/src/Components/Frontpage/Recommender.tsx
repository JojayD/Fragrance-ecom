import React, { useEffect, useState } from "react";
import FragranceCard from "./FragranceCard";
import { Container, Row, Col } from "react-bootstrap";

import styles from "/frontend/src/Styles/Recommender.module.css";
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
type Props = {
	listOfFragrances: Fragrance[];
	data: Fragrance;
};

export default function Recommender({ listOfFragrances, data }: Props) {
	const [notes, setNotes] = useState<string[]>([]);
	useEffect(() => {
		let dataFragrance = data.Notes.split(", ");
		dataFragrance[0] = dataFragrance[0].replace(" ", "");
		setNotes(dataFragrance);
		console.log(`Notes of ${data.Name}`, notes);
	}, []);

	const intersection = (a1: string[], a2: string[]) =>
		a1.filter((x) => a2.includes(x)).length;

	const mapRecommendation = () => {
		return listOfFragrances.map((fragrance, index) => {
			let currFragrance: string[] = [];
			if (fragrance.Notes) {
				currFragrance = fragrance.Notes.split(", ");
				currFragrance[0] = currFragrance[0].replace(" ", "");
				if (intersection(currFragrance, notes) > 2) {
					return (
						<Col key={index}>
							<FragranceCard
								key={fragrance.Id}
								data={fragrance}
								showDescription={false}
							/>
						</Col>
					);
				}
			}
		});
	};

	return (
		<div className={styles.container}>
			<h1>
				<b>You also might like these fragrances</b>
			</h1>
			<Container
				fluid
				className={styles.container__scrollable}
			>
				<Row>{mapRecommendation()}</Row>
			</Container>
		</div>
	);
}
