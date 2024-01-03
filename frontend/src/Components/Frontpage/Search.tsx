import { useEffect, useState } from "react";
import FragranceCard from "../Frontpage/FragranceCard";
import { Button, FormControl, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "/frontend/src/Styles/Search.module.css";
interface MyButtonProps {
	title: string;
	func?: () => any;
}

interface Fragrance {
	Name: string;
	Brand: string;
	Description: string;
	Notes: string;
	ImageURL: string;
}

function MyButton({ title, func }: MyButtonProps) {
	return <Button onClick={func}>{title}</Button>;
}

interface SearchProps {
	listOfFragrances: Fragrance[];
	headerSearchBar?: string | undefined;
}

const Search: React.FC<SearchProps> = ({
	listOfFragrances,
	headerSearchBar,
}) => {
	const [filterNameButton, setFilterNameButton] = useState<string>("Filter");
	const [fragranceQuery, setFragranceQuery] = useState<string>("");
	const [filteredItems, setFilteredItems] = useState<Fragrance[]>([]);

	function checkHomeSearched() {
		if (headerSearchBar) {
			setFragranceQuery(headerSearchBar);
		} else {
			setFragranceQuery(""); // Set a default value if headerSearchBar is undefined
		}
	}
	useEffect(() => {}, [filterNameButton]);

	useEffect(() => {
		if (headerSearchBar) {
			setFragranceQuery(headerSearchBar);
		}
	}, [headerSearchBar]);

	function handleInput(event: any) {
		const input = event.target.value;
		setFragranceQuery(input);
	}

	function filteringSearch() {
		const filteredFragrances = listOfFragrances.filter((fragrance) => {
			const loweredInputValue = fragranceQuery ? fragranceQuery.toLowerCase() : "";
			switch (filterNameButton) {
				case "Brand":
					setFilterNameButton("Brand");
					return (
						fragrance.Brand &&
						fragrance.Brand.toLowerCase().includes(loweredInputValue)
					);
				case "Name":
					setFilterNameButton("Notes");
					return (
						fragrance.Name && fragrance.Name.toLowerCase().includes(loweredInputValue)
					);

				case "Notes":
					setFilterNameButton("Name");
					return (
						fragrance.Notes &&
						fragrance.Notes.toLowerCase().includes(loweredInputValue)
					);
				default:
					// If no specific filter is selected, search across all fields
					return Object.values(fragrance).some(
						(value) =>
							value && value.toString().toLowerCase().includes(loweredInputValue)
					);
			}
		});
		setFilteredItems(filteredFragrances);
	}

	const renderFragrances = () => {
		return filteredItems.map((data, index) => (
			<FragranceCard
				key={index}
				data={data}
			/>
		));
	};

	function handleDropDownSelect(filterBy: any) {
		if (filterBy == "Brand") {
			setFilterNameButton("Brand");
		} else if (filterBy == "Name") {
			setFilterNameButton("Name");
		} else if (filterBy == "Notes") {
			setFilterNameButton("Notes");
		} else {
			setFilterNameButton("Filter");
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles["container__form-control"]}>
				<FormControl
					type='text'
					value={fragranceQuery}
					onChange={handleInput}
				/>
			</div>
			<div className={styles["container__search-buttons"]}>
				<div className={styles["container__search-buttons-item"]}>
					<Link to={"/"}>
						<MyButton title='Back' />
					</Link>
				</div>

				<div className={styles["container__search-buttons-item"]}>
					<Dropdown onSelect={handleDropDownSelect}>
						<Dropdown.Toggle
							variant='primary'
							id='dropdown-basic'
						>
							{filterNameButton}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item eventKey='Brand'>Brand</Dropdown.Item>

							<Dropdown.Item eventKey='Name'>Name</Dropdown.Item>

							<Dropdown.Item eventKey='Notes'>Notes</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
				<div className={styles["container__search-buttons-item"]}>
					<MyButton
						title='Search'
						func={filteringSearch}
					/>
				</div>
			</div>
			<div className={styles["container__filtered-items"]}>
				{renderFragrances()}
			</div>
		</div>
	);
};
export default Search;
