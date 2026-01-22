import { Link } from "next-view-transitions";
import NextLink from "next/link";
import styles from "./component.module.css";

const Button = ({
	className,
	children,
	...props
}: React.ComponentProps<typeof NextLink>) => (
	<Link
		className={`${styles.component} ${className}`}
		{...props}
	>
		{children}
	</Link>
);

export default Button;
