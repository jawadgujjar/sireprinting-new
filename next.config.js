/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 🚫 ESLint ko ignore karo build ke waqt
  },
};

module.exports = nextConfig;
