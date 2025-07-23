import type { NextConfig } from "next";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: 'development', // disable in dev
});

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'fcciydtjyavylcsardnu.supabase.co',
      pathname: '/storage/v1/object/sign/stickers/**'
    }]
  }
};

export default withPWA(nextConfig);
