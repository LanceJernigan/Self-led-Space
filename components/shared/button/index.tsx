import { Link } from "next-view-transitions";
import NextLink from "next/link";
import styles from "./component.module.css";

const Button = ({
	className,
	children,
	variant = "dark",
	...props
}: React.ComponentProps<typeof NextLink> & { variant?: "dark" | "light" }) => (
	<Link
		className={`${styles.component} ${className}`}
		data-variant={variant}
		{...props}
	>
		{children}
	</Link>
);

export default Button;
