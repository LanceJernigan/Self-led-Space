"use client";

import Image from "next/image";
import styles from "./component.module.css";
import { Link } from "next-view-transitions";
import Menu from "@/components/shared/icons/menu";
import { useState } from "react";

type HeaderProps = {
	links: { label: string; href: string; id?: string | null }[];
	logo: { src: string; alt: string };
};

const Header = ({ links, logo }: HeaderProps) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<header className={styles.component}>
				<div className={styles.wrapper}>
					<Link
						href="/"
						className={styles.logo}
					>
						<Image
							src={logo.src}
							width="120"
							height="120"
							alt={logo.alt}
							quality="100"
						/>
					</Link>
					<button
						className={styles.menuToggle}
						onClick={() => setOpen(!open)}
						aria-controls="site-navigation"
						aria-expanded={open}
						aria-label="Open menu"
					>
						<Menu />
					</button>
				</div>
			</header>
			<nav
				className={styles.menu}
				id="site-navigation"
				data-open={open}
				aria-hidden={!open}
				onClick={() => setOpen(false)}
			>
				<ul className={styles.list}>
					{links.map(({ href, label }, i) => (
						<li
							key={i}
							className={styles.item}
							tabIndex={open ? 0 : -1}
							style={{
								transitionDelay: `${open ? i * 100 + 100 : 0}ms`,
							}}
						>
							<Link href={href}>{label}</Link>
						</li>
					))}
				</ul>
			</nav>
		</>
	);
};

export default Header;
