import styles from "./component.module.css";

type FooterProps = {
	organizationName: string;
};

const Footer = ({ organizationName }: FooterProps) => {
	const year = new Date().getFullYear();
	return (
		<footer className={styles.component}>
			<div className={styles.wrapper}>
				<p>
					&copy; {year} {organizationName}
				</p>
			</div>
		</footer>
	);
};

export default Footer;
