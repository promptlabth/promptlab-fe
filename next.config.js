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
    experimental: {
        // next-i18next loads public/locales/*.json from disk at runtime, which
        // output file tracing cannot see — without this, serverless deploys
        // (Netlify/Vercel) ship SSR functions with no translation files and
        // every page renders raw i18n keys.
        outputFileTracingIncludes: {
            '/': ['./public/locales/**/*'],
            '/**': ['./public/locales/**/*'],
        },
    },
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