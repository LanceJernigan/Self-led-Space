import styles from "./component.module.css";
import { SpecialtiesProps } from "./types";

const Specialties = ({ heading, items }: SpecialtiesProps) => (
	<section className={styles.component}>
		<h2 className={styles.heading}>{heading}</h2>
		<ul className={styles.list}>
			{items.map((item, index) => (
				<li key={index} className={styles.pill}>
					{item}
				</li>
			))}
		</ul>
	</section>
);

export default Specialties;
