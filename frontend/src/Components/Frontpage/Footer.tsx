import React from "react";
import styles from "/frontend/src/Styles/Footer.module.css";
import { Form } from "react-bootstrap";
import fb from "/frontend/src/assets/icons8-facebook.svg";
import insta from "/frontend/src/assets/icons8-instagram.svg";
import tiktok from "/frontend/src/assets/icons8-tik-tok.svg";
import x from "/frontend/src/assets/icons8-x-50.png";
import amazon from "/frontend/src/assets/amazon.png";
import american_express from "/frontend/src/assets/icons8-american-express.svg"
import paypal from "/frontend/src/assets/icons8-paypal.svg"
import visa from "/frontend/src/assets/icons8-visa.svg";
import discover from "/frontend/src/assets/icons8-discover-card.svg";
type Props = {};

function Footer({}: Props) {
	return (
		<div className={styles.container}>
			<div className={styles["wrapper__sign-up-form"]}>
				<div className={styles.wrapper__title}>Sign up today</div>
				<Form>
					<div className={styles["wrapper__control-forms"]}>
						<Form.Control
							type='email'
							placeholder='email'
							size='sm'
						/>

						<Form.Control
							type='text'
							placeholder='phone number'
							size='sm'
						/>
					</div>
				</Form>
			</div>
			<div className={styles["container__li-imgs"]}>
				<div>Find us on</div>
				<div className={styles["wrapper__li-imgs"]}>
					<li>
						<div className={styles.wrapper__img}>
							<img src={fb} />
						</div>
					</li>
					<li>
						<div className={styles.wrapper__img}>
							<img src={insta} />
						</div>
					</li>
					<li>
						<div className={styles.wrapper__img}>
							<img src={tiktok} />
						</div>
					</li>
					<li>
						<div className={styles.wrapper__img}>
							<img src={x} />
						</div>
					</li>
				</div>
			</div>
			<div className={styles["container__li-imgs"]}>
				<div>We accept</div>
				<div className={styles["wrapper__li-imgs"]}>
					<li>
						<div className={styles.wrapper__img}>
							<img src={american_express} />
						</div>
					</li>
					<li>
						<div className={styles.wrapper__img}>
							<img src={discover} />
						</div>
					</li>
					<li>
						<div className={styles.wrapper__img}>
							<img src={visa} />
						</div>
					</li>
					<li>
						<div className={styles.wrapper__img}>
							<img src={amazon} />
						</div>
					</li>
					<li>
						<div className={styles.wrapper__img}>
							<img src={paypal} />
						</div>
					</li>
				</div>
			</div>
		</div>
	);
}

export default Footer;
