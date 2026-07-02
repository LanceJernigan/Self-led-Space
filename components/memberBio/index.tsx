import Image from "next/image";
import styles from "./component.module.css";
import { MemberBioProps } from "./types";

const MemberBio = ({ name, title, intro, gallery, body }: MemberBioProps) => (
	<section className={styles.component}>
		<div className={styles.wrapper}>
			<header className={styles.header}>
				<h2 className={styles.subheading}>{title}</h2>
				<h1 className={styles.heading}>{name}</h1>
			</header>
			<div className={styles.description}>
				{intro.map((paragraph, index) => (
					<p key={index}>{paragraph}</p>
				))}
			</div>
			{gallery.length > 0 && (
				<div className={styles.gallery}>
					{gallery.map((image, index) => (
						<div key={index} className={styles.image}>
							<Image
								src={image.src}
								alt={image.alt}
								fill
								sizes="(max-width: 768px) 100vw, 400px"
								quality="100"
							/>
						</div>
					))}
				</div>
			)}
			<div className={styles.description}>
				{body.map((paragraph, index) => (
					<p key={index}>{paragraph}</p>
				))}
			</div>
		</div>
	</section>
);

export default MemberBio;
