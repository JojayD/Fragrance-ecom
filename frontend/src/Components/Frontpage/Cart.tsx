import  { useEffect, useState } from "react";
import { app } from "../../../../backend/firebase/firebase";
import { collection, getFirestore, getDocs } from "firebase/firestore";
import { Button } from "react-bootstrap";
import FragranceCard from "./FragranceCard";
import { onSnapshot } from "firebase/firestore";
import Header from "./Header";
import styles from "/frontend/src/Styles/Cart.module.css";
type Props = {};

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
	const [total, setTotal] = useState<number>(0);

	useEffect(() => {}, []);

	useEffect(() => {
		addPrice();
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
						Id: doc.data().Id,
						Quantity: doc.data().Quantity,
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
					Quantity: doc.data().Quantity,
				});
			});

			setStoredFragrance(newFragrance);
		}
		getDataSnapShot();
	}, []);

	function addPrice() {
		console.log("going in addPrice");

		if (storedFragrance.length == 1) {
			setTotal(storedFragrance[0].Price);
		} else {
			let arr: number[] = [];
			let price: number = 0;
			storedFragrance.forEach((prod) => {
				if (prod.Quantity > 0) {
					arr.push(prod.Price * prod.Quantity);
				} else {
					arr.push(prod.Price);
				}
			});

			arr.forEach((el) => {
				price += el;
			});
			console.log("logging price: ", price);

			let finalPrice: number = price * 0.0875 + price;
			let fixedPrice = finalPrice.toFixed(2);

			setTotal(parseFloat(fixedPrice));
		}
	}

	function renderSavedFragrances() {
		return storedFragrance.map((data, index) => (
			<FragranceCard
				data={data}
				key={data.Id}
				showRemoveBag={true}
				showAddBag={false}
				showQuantity={true}
				showViewMore={false}
			/>
		));
	}

	return (
		<>
			<Header />
			<div className={styles.container__cart}>
				<div>Total: {total}</div>
				<div className={styles.container__renderSavedFragrances}>
					{renderSavedFragrances()}
				</div>
			</div>
		</>
	);
}

export default Cart;
