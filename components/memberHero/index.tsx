import Image from "next/image";
import styles from "./component.module.css";
import { MemberHeroProps } from "./types";

const MemberHero = ({ banner, photo }: MemberHeroProps) => (
	<section className={styles.component}>
		<div className={styles.wrapper}>
			<div className={styles.banner}>
				<Image
					src={banner.src}
					alt={banner.alt}
					fill
					priority
					sizes="(max-width: 1340px) 100vw, 1340px"
					quality="100"
					className={styles.background}
				/>
			</div>
			<div className={styles.photo}>
				<Image
					src={photo.src}
					alt={photo.alt}
					fill
					priority
					sizes="(max-width: 768px) 90vw, 200px"
					quality="100"
					className={styles.portrait}
				/>
			</div>
		</div>
	</section>
);

export default MemberHero;
