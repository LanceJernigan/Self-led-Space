import type { Metadata } from "next";
import { Raleway, Lato } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const raleway = Raleway({
	variable: "--font-raleway",
	subsets: ["latin"],
});

const lato = Lato({
	variable: "--font-lato",
	weight: ["400"],
});

export const metadata: Metadata = {
	title: {
		template: "%s | Self-led Space",
		default: "Self-led Space | Compassionate Therapy & Care",
	},
	description: "A collective of therapists offering a supportive space to heal, reflect, and grow.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ViewTransitions>
			<html lang="en">
				<body className={`${raleway.variable} ${lato.variable} antialiased`}>
					<Header />
					{children}
					<Footer />
				</body>
			</html>
		</ViewTransitions>
	);
}
