import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: [
				"/user",
				"/lib",
				"/class",
				"/api",
				"/pdf",
				"/actions",
				"/admin",
				"/university",
			],
		},
	};
}
