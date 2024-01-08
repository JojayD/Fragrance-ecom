import React, { useEffect, useState } from "react";
import { app } from "/Users/jojo/Desktop/Web-Dev-Projects/fragrance_ecom/backend/firebase/firebase";
import { collection, getFirestore, getDocs } from "firebase/firestore";
import { Button } from "react-bootstrap";
import FragranceCard from "./FragranceCard";
import { onSnapshot } from "firebase/firestore";
import Header from "./Header";
type Props = {};

interface Fragrance {
	Name: string;
	Brand: string;
	Description: string;
	Notes: string;
	ImageURL: string;
	Price: number;
	Id: string;
}

interface MyButtonProps {
	title: String;
	func?: () => void;
}

function MyButton({ title, func }: MyButtonProps) {
	return <Button onClick={func}>{title}</Button>;
}

function Cart({}: Props) {
	const db = getFirestore(app);
	const [storedFragrance, setStoredFragrance] = useState<Fragrance[]>([]);

	useEffect(() => {
		console.log("Stored fragrance: ", storedFragrance);
	}, [storedFragrance]);

	useEffect(() => {
		const unsubscribe = onSnapshot(
			collection(db, "savedFragrances"),
			(snapshot) => {
				const items: Fragrance[] = [];
				snapshot.forEach((doc) => {
					items.push({
						Name: doc.data().Name,
						Brand: doc.data().Brand,
						Description: doc.data().Description,
						Notes: doc.data().Notes,
						ImageURL: doc.data().ImageURL,
						Price: doc.data().Price,
						Id: doc.data().Id
					});
				});
				setStoredFragrance(items);
			}
		);

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		async function getDataSnapShot() {
			const querySnapshot = await getDocs(collection(db, "savedFragrances"));
			const newFragrance: Fragrance[] = [];
			querySnapshot.forEach((doc) => {
				newFragrance.push({
					Name: doc.data().Name,
					Brand: doc.data().Brand,
					Description: doc.data().Description,
					Notes: doc.data().Notes,
					ImageURL: doc.data().ImageURL,
					Price: doc.data().Price,
					Id: doc.data().Id,
				});
			});

			setStoredFragrance(newFragrance);
		}
		getDataSnapShot();
	}, []);

	function renderSavedFragrances() {
		return storedFragrance.map((data, index) => (
			<FragranceCard
				data={data}
				key={data.Id}
				showRemoveBag={true}
				showAddBag={false}
			/>
		));
	}

	return (
		<div>
			<Header />
			<div>{renderSavedFragrances()}</div>
		</div>
	);
}

export default Cart;
