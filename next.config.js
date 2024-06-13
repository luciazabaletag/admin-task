/** @type {import('next').NextConfig} */

const apiUrl = {
    develop: 'http://localhost:3000/api',
    prod: 'https://admin-task-zeta.vercel.app/api',
  };
  
  const nextConfig = {
    env: {
      apiUrl: apiUrl.prod || apiUrl.develop
    },
    reactStrictMode: false,
    typescript: {
      ignoreBuildErrors: true,
    }
  };
  
  module.exports = nextConfig;