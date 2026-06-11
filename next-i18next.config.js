/** @type {import('next-i18next').UserConfig} */
const path = require('path')

module.exports = {
    i18n: {
        defaultLocale: 'th',
        locales: ['th' ,'en', 'id'],
        localeDetection: false,
    },
    // Absolute path so serverless bundlers trace the locale files into the
    // SSR function (the relative default resolves against the lambda cwd,
    // where public/locales does not exist).
    localePath: path.resolve('./public/locales'),
}