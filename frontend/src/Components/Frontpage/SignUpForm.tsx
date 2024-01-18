import fragrance_img from "/frontend/src/assets/fragrance-img.jpeg";
import { Button, Form } from "react-bootstrap";
import styles from "/frontend/src/Styles/SignUpForm.module.css";
import { Link } from "react-router-dom";
type Props = {};

function SignUpForm({}: Props) {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper__form}>
				<h1 className={styles.item1}>
					<b>Joda Fragrance</b>
				</h1>
				<div className={styles.item2}>
					<Form className={styles["custom-form-control"]}>
						<Form.Label>email</Form.Label>
						<Form.Control type='email' />
						<Form.Label>Phone</Form.Label>
						<Form.Control type='text' />
						<Form.Label>Password</Form.Label>
						<Form.Control type='password' />
					</Form>
				</div>
				<div className={styles.item3}>
					<img src={fragrance_img} />
				</div>
				<div className={styles.item4}>
					<Button> Sign Up Now</Button>
				</div>
				<div className={styles.item5}>
					<Link to={`/`}>
						<Button>Take me back</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default SignUpForm;
