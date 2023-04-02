/** @type {import('next').NextConfig} */

require("dotenv").config();
const path = require('path')

const nextConfig = {
    reactStrictMode: true,
    env: {
        openAPI_KEY : process.env.OPEN_API_KEY
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
}

module.exports = nextConfig
