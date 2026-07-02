import styles from "./component.module.css";
import { QualificationsProps } from "./types";

const Qualifications = ({ heading, items }: QualificationsProps) => (
	<section className={styles.component}>
		<div className={styles.wrapper}>
			<h2 className={styles.heading}>{heading}</h2>
			<dl className={styles.list}>
				{items.map((item, index) => (
					<div key={index} className={styles.item}>
						<dt className={styles.label}>{item.label}</dt>
						<dd className={styles.content}>
							{item.content.map((line, lineIndex) => (
								<span key={lineIndex}>{line}</span>
							))}
						</dd>
					</div>
				))}
			</dl>
		</div>
	</section>
);

export default Qualifications;
