import type {NextConfig} from 'next';
import withPWA from 'next-pwa';


const nextConfig: NextConfig = {
    distDir: "build",
    reactStrictMode: true,
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
    experimental: {
        turbo: {
            rules: {
                "*.mdx": ["mdx-loader"],
            },
        },
    },
};

export default withPWA({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    skipWaiting: true,
})(nextConfig);
