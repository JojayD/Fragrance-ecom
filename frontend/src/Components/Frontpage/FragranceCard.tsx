import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import styles from "/frontend/src/Styles/Fragrance.module.css";
import {
	collection,
	addDoc,
	getFirestore,
	query,
	where,
	getDocs,
	doc,
	deleteDoc

} from "firebase/firestore";
import { app } from "/Users/jojo/Desktop/Web-Dev-Projects/fragrance_ecom/backend/firebase/firebase";
interface Fragrance {
	Name: string;
	Brand: string;
	Description: string;
	Notes: string;
	ImageURL: string;
	Price: number;
}

type Props = {
	data: Fragrance;
	showAddBag?: boolean;
	showRemoveBag?: boolean;
};
interface MyButtonProps {
	title: String;
	func?: () => void;
}

function MyButton({ title, func }: MyButtonProps) {
	return <Button onClick={func}>{title}</Button>;
}

export default function FragranceCard({
	data,
	showAddBag = true,
	showRemoveBag = false,
}: Props) {
	const db = getFirestore(app);
	const longDescription = data.Description;
	const [viewStatus, setViewStatus] = useState<Boolean>(false);
	const [description, setDescription] = useState<String>(
		data.Description.slice(0, 50)
	);
	function viewMoreHandler() {
		if (data.Description.length > 200 && viewStatus === false) {
			setDescription(longDescription);
			setViewStatus((prev) => !prev);
		} else {
			setDescription(data.Description.substring(0, 50));
			setViewStatus((prev) => !prev);
		}
	}

	async function addToBagHandler() {
		//Access colletion
		const collectionRef = collection(db, "savedFragrances");
		// Seeing if that snapshot exsists
		const q = query(collectionRef, where("Name", "==", `${data.Name}`));
		try {
			const querySnapshot = await getDocs(q);
			if (querySnapshot.empty) {
				console.log("Adding data");
				try {
					const docRef = await addDoc(collection(db, "savedFragrances"), {
						Name: data.Name,
						Brand: data.Brand,
						Description: data.Description,
						Notes: data.Notes,
						ImageURL: data.ImageURL,
						Price: data.Price
					});
					localStorage.setItem(`${data.Name}`,`${docRef.id}`)
					console.log(docRef.id);
					
					console.log("Document written with ID: ", docRef.id);
				} catch (e) {
					console.error("Error adding document: ", e);
				}
			} else {
				console.log("Document exists.");
			}
		} catch (error) {
			console.error("Error getting documents: ", error);
		}
	}

	async function removeFromBag() {
		try {
			await deleteDoc(doc(db, "savedFragrances", `${localStorage.getItem(`${data.Name}`)}`));
			console.log("Removed item");
			
			localStorage.removeItem(`${data.Name}`)
			
		} catch (e) {
			console.log("Logging error", e);
		}
	}

	return (
		<>
			<div className={styles.container__fragrance}>
				{data.ImageURL !== "" && (
					<div className={styles["container__fragrance-img"]}>
						<img src={data.ImageURL} />
					</div>
				)}
				<p>${data.Price}</p>
				<p>Fragrance Name: {data.Name}</p>
				<p>{data.Brand}</p>
				<p>{description}</p>
				<div>
					<MyButton
						title={`View More`}
						func={viewMoreHandler}
					/>

					{showAddBag && (
						<MyButton
							title={`Add`}
							func={addToBagHandler}
						/>
					)}

					{showRemoveBag && (
						<MyButton
							title={`Remove`}
							func={removeFromBag}
						/>
					)}
				</div>
			</div>
		</>
	);
}
