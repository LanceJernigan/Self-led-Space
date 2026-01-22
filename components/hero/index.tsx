"use client";

import Image from "next/image";
import styles from "./component.module.css";
import { useEffect, useState } from "react";

const quotes = [
	{
		text: "One who conquers the sea today is ready to conquer the ocean tomorrow.",
		author: "Matshona Dhliwayo",
	},
	{
		text: "Small steps taken with intention can carry us to places we once thought unreachable.",
		author: "Brené Brown",
	},
	{
		text: "Out of difficulties grow miracles of courage, clarity, and compassion.",
		author: "Anaïs Nin",
	},
];

const Hero = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const duration = 10;

	useEffect(() => {
		const slideInterval = setInterval(() => {
			setCurrentSlide((prevSlide) => (prevSlide + 1) % quotes.length);
		}, duration * 1000);
		return () => clearInterval(slideInterval);
	}, []);

	return (
		<section className={styles.component}>
			<div className={styles.wrapper}>
				<div className={styles.content}>
					<h1>Grow at your own pace.</h1>
					<p>
						A safe, nurturing space for healing and self-discovery. Together,
						we’ll create the balance and peace you’ve been seeking.
					</p>
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
					src="/assets/images/homepage-hero.jpg"
					alt="Calm mountain range"
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
