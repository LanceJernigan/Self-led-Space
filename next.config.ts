import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
	images: {
		qualities: [100, 75],
	},
};

export default withPayload(nextConfig);
