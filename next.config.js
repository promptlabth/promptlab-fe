/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')
require("dotenv").config();
const path = require('path')

const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    i18n,
    webpack(config, { isServer }) {
        if (!isServer) {
            config.resolve.alias = {
              ...config.resolve.alias,
              'core-js': false,
              'regenerator-runtime': false,
            };
        }
        config.resolve.fallback = {
            ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
            // by next.js will be dropped. Doesn't make much sense, but how it is
            fs: false, // the solution
        };

        return config;
    },
}

module.exports = nextConfig