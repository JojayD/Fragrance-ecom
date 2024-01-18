import { useEffect, useState } from "react";
import FragranceCard from "../Frontpage/FragranceCard";
import { Button, FormControl, Dropdown } from "react-bootstrap";
import styles from "/frontend/src/Styles/Search.module.css";
import Header from "./Header";
import { Link } from "react-router-dom";
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
	Price: number;
	Id: string;
	Quantity: number;
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

	useEffect(() => {}, [filterNameButton]);

	useEffect(() => {
		if (headerSearchBar) {
			console.log("here");
			setFragranceQuery(headerSearchBar);
			searchFromHeader();
		}
	}, []);

	function handleInput(event: any) {
		const input = event.target.value;
		setFragranceQuery(input);
	}

	function searchFromHeader() {
		console.log(listOfFragrances);

		const listFound = listOfFragrances.filter((fragrance) => {
			const loweredInputValue = headerSearchBar
				? headerSearchBar.toLowerCase()
				: "";
			if (fragrance.Brand.toLowerCase().includes(loweredInputValue)) {
				return (
					fragrance.Brand &&
					fragrance.Brand.toLowerCase().includes(loweredInputValue)
				);
			} else if (fragrance.Name.toLowerCase().includes(loweredInputValue)) {
				return (
					fragrance.Name && fragrance.Name.toLowerCase().includes(loweredInputValue)
				);
			} else {
				return (
					fragrance.Notes &&
					fragrance.Notes.toLowerCase().includes(loweredInputValue)
				);
			}
		});

		setFilteredItems(listFound);
		console.log(filteredItems);
	}

	function filteringSearch() {
		console.log("filteringSearch button was clicked");
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

	function handleKeyDownEvent(event: any) {
		if (event.key == "Enter") {
			filteringSearch();
		}
	}

	const renderFragrances = () => {
		return filteredItems.map((data) => (
			<Link
				style={{ textDecoration: "none", color: "black" }}
				key={data.Id}
				to={`/fragrance-detail/${data.Id}`}
				className={styles.fragarnce__link}
				onClick={(event) => event.preventDefault()}
			>
				<FragranceCard
					isDynamic={false}
					key={data.Id}
					data={data}
					showDescription={false}
				/>
			</Link>
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
		<>
			<Header showSearch={false} />
			<div className={styles.container}>
				<div className={styles["container__forms"]}>
					<div className={styles["container__form-control"]}>
						<FormControl
							type='text'
							value={fragranceQuery}
							onChange={handleInput}
							onKeyDown={handleKeyDownEvent}
						/>
					</div>
					<div className={styles["container__search-buttons"]}>
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
			</div>
		</>
	);
};
export default Search;
