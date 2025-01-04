/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "http",
        hostname: "192.168.88.5",
      },
      {
        protocol: "https",
        hostname: "sadakatcdn.cyparta.com",
      },
      {
        protocol: "https",
        hostname: "nyc3.digitaloceanspaces.com",
      },
    ],
  },
};

export default nextConfig;
