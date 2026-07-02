import styles from "./component.module.css";
import { ExpertiseProps } from "./types";

const Expertise = ({ heading, items }: ExpertiseProps) => (
	<section className={styles.component}>
		<h2 className={styles.heading}>{heading}</h2>
		<div className={styles.wrapper}>
			<ul className={styles.list}>
				{items.map((item, index) => (
					<li key={index} className={styles.item}>
						{item}
					</li>
				))}
			</ul>
		</div>
	</section>
);

export default Expertise;
