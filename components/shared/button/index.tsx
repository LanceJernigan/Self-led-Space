import { Link } from "next-view-transitions";
import styles from "./component.module.css";

const Button = () => (
	<Link
		href="/about"
		className={styles.component}
	>
		Read More
	</Link>
);

export default Button;
