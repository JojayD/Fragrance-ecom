import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import styles from "/frontend/src/Styles/Fragrance.module.css";
interface Fragrance {
	Name: string;
	Brand: string;
	Description: string;
	Notes: string;
	ImageURL: string;
	Price: number;
}

type Props = { data: Fragrance };
interface MyButtonProps {
	title: String;
	func: () => void;
}

function MyButton({ title, func }: MyButtonProps) {
	return <Button onClick={func}>{title}</Button>;
}

export default function Fragrance({ data }: Props) {
	const longDescription = data.Description;
	const [viewStatus, setViewStatus] = useState<Boolean>(false);
	const [description, setDescription] = useState<String>(
		data.Description.slice(0, 50)
	);
	useEffect(() => {
		
	}, []);

	function viewMoreHandler() {
		if (data.Description.length > 200 && viewStatus === false) {
			setDescription(longDescription);
			setViewStatus((prev) => !prev);
		} else {
			setDescription(data.Description.substring(0, 50));
			setViewStatus((prev) => !prev);
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
				<MyButton
					title={`View More`}
					func={viewMoreHandler}
				/>
			</div>
		</>
	);
}
