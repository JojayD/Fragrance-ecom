import { useState } from "react";
import { Button } from "react-bootstrap";
import styles from "/frontend/src/Styles/Fragrance.module.css";
import { useNavigate } from "react-router";
import {
	collection,
	addDoc,
	getFirestore,
	query,
	where,
	getDocs,
	doc,
	deleteDoc,
} from "firebase/firestore";
import { app } from "/Users/jojo/Desktop/Web-Dev-Projects/fragrance_ecom/backend/firebase/firebase";
interface Fragrance {
	Name: string;
	Brand: string;
	Description: string;
	Notes: string;
	ImageURL: string;
	Price: number;
	Id: string;
}

type Props = {
	data: Fragrance;
	showAddBag?: boolean;
	showRemoveBag?: boolean;
	showDescription?: boolean;
	isDynamic?: boolean;
	showQuantity?: boolean;
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
	showDescription = true,
	isDynamic = false,
}: Props) {
	const db = getFirestore(app);
	const longDescription = data.Description;
	const [viewStatus, setViewStatus] = useState<Boolean>(false);
	const [description, setDescription] = useState<String>(
		data.Description.slice(0, 100)
	);
	const navigate = useNavigate();

	//Dynamic CSS
	const title = viewStatus ? "minimize" : "expand"
	const classNameContainer = isDynamic
		? styles["container__fragrance__true"]
		: styles["container__fragrance__false"];
	const classNameImg = isDynamic
		? styles["container__fragrance-img-true"]
		: styles["container__fragrance-img-false"];
	const dynamicGridRight = isDynamic ? styles["container__grid-right"] : "";
		//End Dynamic CSS
	const viewMoreHandler = () => {
		navigate(`/fragrance-detail/${data.Id}`);
	};
	function handleDescription() {
		if (data.Description.length > 200 && viewStatus === false) {
			setDescription(longDescription);
			setViewStatus((prev) => !prev);
		} else {
			setDescription(data.Description.substring(0, 200));
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
						Price: data.Price,
					});
					localStorage.setItem(`${data.Name}`, `${docRef.id}`);
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
			await deleteDoc(
				doc(db, "savedFragrances", `${localStorage.getItem(`${data.Name}`)}`)
			);
			console.log("Removed item");

			localStorage.removeItem(`${data.Name}`);
		} catch (e) {
			console.log("Logging error", e);
		}
	}

	return (
		<>
			<div className={classNameContainer}>
				{data.ImageURL !== "" && (
					<div className={classNameImg}>
						<img src={data.ImageURL} />
					</div>
				)}
				<div className={dynamicGridRight}>
					<b>${data.Price}</b>
					<p>{data.Name}</p>
					<p >{data.Brand}</p>
					<p style={{fontSize: "13px"}}>{showDescription && description}</p>
					<div className={styles["container__buttons"]}>
						<MyButton
							title={`View More`}
							func={viewMoreHandler}
						/>

						{showDescription && (
							<MyButton
								title={title}
								func={handleDescription}
							/>
						)}

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
			</div>
		</>
	);
}
