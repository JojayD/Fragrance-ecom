import styles from "/frontend/src/Styles/Header.module.css";
import { Link } from "react-router-dom";
import Cart from "/frontend/src/assets/cart-shopping-solid.svg";
import { useNavigate } from "react-router-dom";
import { Form, Dropdown } from "react-bootstrap";
import { useUserContext } from "../../../context/UserProvider";
type Props = {
	showSearch?: boolean;
	showSignIn?: boolean;
	showCart? : boolean;
};

export default function Header({ showSearch = true }: Props) {
	const navigate = useNavigate();
	const { headerSearchBar, setHeaderSearchBar } = useUserContext();
	function handleKeyDownEvent(event: any) {
		if (event.key == "Enter") {
			console.log(`${headerSearchBar}`);
			const encodedQuery = encodeURIComponent(headerSearchBar);
			console.log(encodedQuery);
			// navigate(`/search-results?query=${encodedQuery}`);
			navigate(`/Search`);
		}
	}

	function changeHandler(event: any) {
		const val = event.target.value;
		setHeaderSearchBar(val);
	}

	return (
		<div className={styles.container}>
			<p>Joda Fragrance</p>
			<header className={styles["container__header"]}>
				<li className={styles["container__header-li"]}>
					<Link
						to={`/`}
						className={styles["container__header-li-el"]}
					>
						Home
					</Link>
					<Link
						to={`/Fragrances`}
						className={styles["container__header-li-el"]}
					>
						Fragrances
					</Link>
					<Link
						to={`/`}
						className={styles["container__header-li-el"]}
					>
						Sign in
					</Link>
					<div className={styles["container__fonts"]}>
						{showSearch && (
							<Dropdown className={styles["no-dropdown-arrow"]}>
								<Dropdown.Toggle
									variant='primary'
									id='dropdown-basic'
								>
									Search
								</Dropdown.Toggle>

								<Dropdown.Menu>
									<Dropdown.Item href='#/action-1'>
										<Form.Control
											size='sm'
											type='text'
											placeholder='Small text'
											onClick={(e) => e.stopPropagation()}
											onChange={changeHandler}
											value={headerSearchBar}
											onKeyDown={handleKeyDownEvent}
										/>
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						)}
					</div>
					<Link
						to={`/Cart`}
						className={styles["container__header-li-el"]}
					>
						<img src={Cart} />
					</Link>
				</li>
			</header>
		</div>
	);
}
