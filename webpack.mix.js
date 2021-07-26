let mix = require('laravel-mix');

require('dotenv').config();

require('mix-tailwindcss');

mix
    .setPublicPath('./themes/' + process.env.ACTIVE_THEME + '/assets/')
    .setResourceRoot('/themes/' + process.env.ACTIVE_THEME + '/assets/')
    .js('./themes/' + process.env.ACTIVE_THEME + '/assets/src/js/alpine.js', 'public/js')
    .js('./themes/' + process.env.ACTIVE_THEME + '/assets/src/js/lazysizes.js', 'public/js')
    .postCss('./themes/' + process.env.ACTIVE_THEME + '/assets/src/css/styles.css', 'public/css')
    .tailwind()
    .options({
        processCssUrls: false
    })
    .sourceMaps(false)
    .browserSync({
        proxy: process.env.APP_URL,
        host: process.env.APP_URL,
        browser: 'google chrome',
        notify: false,
        files: ["./themes/media1/assets/public/css/*.css", "./**/*.htm", "./themes/media1/assets/public/js/*.js"]
    });