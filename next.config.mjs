/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',  <-- remove this
  trailingSlash: true,
  images: { unoptimized: true },  // you can also remove unoptimized if you want Vercel image optimization
};

export default nextConfig;