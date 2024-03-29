import { useState } from "react";
import fragance_panel from "/frontend/src/assets/frag_panel_comp.png";
import Carousel from "react-bootstrap/Carousel";
import "/frontend/src/Styles/LandingPage.css";
import Header from "./Header";
import Footer from "./Footer";
type Props = {};

export default function LandingPage({}: Props) {
	function ControlledCarousel() {
		const [index, setIndex] = useState(0);

		const handleSelect = (selectedIndex: any) => {
			setIndex(selectedIndex);
		};

		return (
			<>
				<div className='container__carousel'>
					<Carousel
						activeIndex={index}
						onSelect={handleSelect}
						className='custom-carousel'
					>
						<Carousel.Item>
							<div className='carousel-item-wrapper'>
								<img
									src='https://static.luckyscent.com/images/products/51145.jpg?width=400&404=product.png'
									alt={`Alexandria II by Xerjoff`}
								/>
							</div>
						</Carousel.Item>
						<Carousel.Item>
							<div className='carousel-item-wrapper'>
								<img
									src='https://static.luckyscent.com/images/products/70021.jpg?width=400&404=product.png'
									alt={`Exit the King By Etat Libre d Orange`}
								/>
							</div>
						</Carousel.Item>
						<Carousel.Item>
							<div className='carousel-item-wrapper'>
								<img
									src='https://static.luckyscent.com/images/products/477053.jpg?width=400&404=product.png'
									alt={`Layton By Parfums De Marley`}
								/>
							</div>
						</Carousel.Item>
						<Carousel.Item>
							<div className='carousel-item-wrapper'>
								<img
									src='https://static.luckyscent.com/images/products/702055.jpg?width=400&404=product.png'
									alt={`Vanille De Tahiti By Perris`}
								/>
							</div>
						</Carousel.Item>
					</Carousel>
				</div>
			</>
		);
	}

	return (
		<div className='container'>
			<Header />
			<div className='container__img'>
				<img src={fragance_panel} />
			</div>
			<div>{ControlledCarousel()}</div>
			<Footer />
		</div>
	);
}
