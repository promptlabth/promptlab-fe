/** @type {import('next').NextConfig} */

require("dotenv").config();

const nextConfig = {
  reactStrictMode: true,
  env: {
    openAPI_KEY : process.env.OPEN_API_KEY
  },
}

module.exports = nextConfig
