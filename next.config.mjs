/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
               protocol: 'https',
               hostname: "cdn.sanity.io",
               port: "" 
            },
            {
                protocol: 'https',
                hostname: "ucarecdn.com"
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: 'https',
                hostname: 'img.clerk.com'
            }
        ]
    }
};

export default nextConfig;
