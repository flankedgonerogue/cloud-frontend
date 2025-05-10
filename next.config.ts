import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  async headers() {
    const headers = [];
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview") {
      headers.push({
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex",
          },
        ],
        source: "/:path*",
      });
    }
    return headers;
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
