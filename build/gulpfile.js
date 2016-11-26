var gulp = require('gulp'),
    bundle = require('gulp-bundle-assets'),
    ejs = require("gulp-ejs"),
    concat = require("gulp-concat");

gulp.task('bundle', function () {
    return gulp.src('./bundle.config.js')
        .pipe(bundle())
        .pipe(bundle.results({
            pathPrefix: './static/'
        }))
        .pipe(gulp.dest('../static/'));
});

gulp.task('pageCompile', ['bundle'], function () {
    var bundleResult =  require('./bundle.result.json'),
        targetFolder = '../samples/',
        fs = require('fs'),
        pageItemLimit = 1,
        files,
        descriptions,
        pages = [];

    files = fs.readdirSync(targetFolder);
    files = files.map(function (file) {
        return targetFolder + file + '/description.json';
    });
    files = files.filter(function (file) {
        return fs.existsSync(file);
    });
    descriptions = files.map(function (file) {
        return require(file);
    });

    while (descriptions.length) {
        pages.push(descriptions.splice(0, pageItemLimit));
    }
    pages.forEach(function (experienceList, index) {
        gulp.src("./app/templates/experienceList.ejs")
            .pipe(ejs({
                scripts        : [bundleResult['vendor']['scripts'], bundleResult['main']['scripts']].join(''),
                styles         : bundleResult['main']['styles'],
                experienceList : experienceList,
                pageCount      : pages.length
            }, {
                ext : '.html'
            }))
            .pipe(concat("page-" + (index + 1) + ".html"))
            .pipe(gulp.dest("../experiences/"));
    });

    // todo : template compilation
    /*
        return gulp.src("./app/templates/*.ejs")
            .pipe(ejs({
                scripts : [bundleResult['vendor']['scripts'], bundleResult['main']['scripts']].join(''),
                styles  : bundleResult['main']['styles']
            },{
                ext : '.html'
            }))
            .pipe(gulp.dest("./app"));
    */
});

gulp.task('copyStatic', function () {
    return gulp.src("./node_modules/bootstrap/fonts/**/*.*", {base : './node_modules/bootstrap/'})
        .pipe(gulp.dest("../static/"));
});

gulp.task('default', ['pageCompile', 'bundle']);