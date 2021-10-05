let mix = require('laravel-mix');

require('mix-tailwindcss');

let fs  = require('fs');

let getFiles = function (dir) {
    return fs.readdirSync(dir).filter(file => {
        return fs.statSync(`${dir}/${file}`).isFile();
    });
};

getFiles('./themes/' + process.env.ACTIVE_THEME + '/assets/src/js/').forEach(function (JSpath) {
    mix
        .setPublicPath('./themes/' + process.env.ACTIVE_THEME + '/assets/')
        .setResourceRoot('/themes/' + process.env.ACTIVE_THEME + '/assets/')
        .js('./themes/' + process.env.ACTIVE_THEME + '/assets/src/js/' + JSpath, 'public/js')
        .sourceMaps(false)
});

getFiles('./themes/' + process.env.ACTIVE_THEME + '/assets/src/css/').forEach(function (CSSpath) {
    mix
        .setPublicPath('./themes/' + process.env.ACTIVE_THEME + '/assets/')
        .setResourceRoot('/themes/' + process.env.ACTIVE_THEME + '/assets/')
        .postCss('./themes/' + process.env.ACTIVE_THEME + '/assets/src/css/' + CSSpath, 'public/css')
        .tailwind()
        .options({
            processCssUrls: false
        })
        .sourceMaps(false)
});

mix
    .browserSync({
        proxy: process.env.APP_URL,
        host: process.env.APP_URL,
        browser: 'google chrome',
        notify: false,
        files: ["./themes/" + process.env.ACTIVE_THEME + "/assets/public/css/*.css", "./**/*.htm", "./themes/" + process.env.ACTIVE_THEME + "/assets/public/js/*.js"]
    });
