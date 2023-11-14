/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.starbucks.fr',
            },
        ],
        experimental: {
            serverActions: true,
        },
    }
}

module.exports = nextConfig
