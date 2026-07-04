"use client";

import Image from "next/image";
import styles from "./component.module.css";
import { useEffect, useState } from "react";
import { HeroProps } from "./types";

const Hero = ({ heading, intro, image, quotes }: HeroProps) => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const duration = 10;

	useEffect(() => {
		if (quotes.length <= 1) return;
		const slideInterval = setInterval(() => {
			setCurrentSlide((prevSlide) => (prevSlide + 1) % quotes.length);
		}, duration * 1000);
		return () => clearInterval(slideInterval);
	}, [quotes.length]);

	return (
		<section className={styles.component}>
			<div className={styles.wrapper}>
				<div className={styles.content}>
					<h1>{heading}</h1>
					<p>{intro}</p>
				</div>
				<div className={styles.quote}>
					<ul
						className={styles.list}
						style={{ "--duration": `${duration}s` } as React.CSSProperties}
					>
						{quotes.map((quote, index) => (
							<li
								className={styles.item}
								key={index}
								data-active={index === currentSlide}
							>
								<h2>{quote.text}</h2>
								<h6>
									- {quote.author}{" "}
									<svg
										width="30"
										height="30"
										viewBox="0 0 30 30"
										className={styles.progress}
									>
										<circle className={styles.progressBg}></circle>
										<circle className={styles.progressFg}></circle>
									</svg>
								</h6>
							</li>
						))}
					</ul>
				</div>
				<Image
					src={image.src}
					alt={image.alt}
					fill
					priority
					sizes="(max-width: 1340px) 100vw, 1340px"
					className={styles.background}
					quality="100"
				/>
			</div>
		</section>
	);
};

export default Hero;
