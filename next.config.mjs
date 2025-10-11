/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'],
    },
    typescript: {
        // ❌ Skip build if type errors exist
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
