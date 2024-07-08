/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'utfs.io',
            pathname: '/f/**', // Allow any path under /f/
          },], 
      },
}

module.exports = nextConfig

const withViedos = require("next-videos");

module.exports = withViedos();