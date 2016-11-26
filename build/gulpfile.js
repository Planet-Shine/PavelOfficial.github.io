var gulp = require('gulp'),
    bundle = require('gulp-bundle-assets'),
    ejs = require("gulp-ejs"),
    html2js = require('gulp-html2js'),
    server = require('gulp-develop-server'),
    open = require('gulp-open');


gulp.task('bundle', ['templates'], function () {
    return gulp.src('./bundle.config.js')
        .pipe(bundle())
        .pipe(bundle.results({
            pathPrefix: './static/'
        }))
        .pipe(gulp.dest('./app/static'));
});

gulp.task('pageCompile', ['bundle'], function () {
    var bundleResult =  require('./bundle.result.json');
    return gulp.src("./app/templates/*.ejs")
        .pipe(ejs({
            scripts : [bundleResult['vendor']['scripts'], bundleResult['main']['scripts']].join(''),
            styles  : bundleResult['main']['styles']
        },{
            ext : '.html'
        }))
        .pipe(gulp.dest("./app"));
});

gulp.task('copyStatic', function () {
    return gulp.src("./node_modules/bootstrap/fonts/**/*.*", {base : './node_modules/bootstrap/'})
        .pipe(gulp.dest("./app/"));
});

gulp.task('templates', function () {
    return gulp.src('./app/js/**/*.html')
        .pipe(html2js('employeeTemplates.js', {
            adapter : 'angular',
            base : './app',
            name : 'employeeTemplates'
        }))
        .pipe(gulp.dest('./app/templates'));
});

gulp.task('runServer', ['buildProject'], function (callback) {
    server.listen({
        path : './node_modules/http-server/bin/http-server',
        args :  ['-a', 'localhost', '-p', '8000', '-c-1', './app']
    });
    setTimeout(function () {
        callback(null);
    }, 500);
});

gulp.task('buildProject', ['pageCompile'], function (callback) {
    callback(null);
});

gulp.task('runApplication', ['runServer'], function () {
    gulp.src(__filename)
        .pipe(open({
            app : 'chrome',
            uri : 'http://localhost:8000/'
        }));
});

gulp.task('default', ['templates', 'pageCompile', 'runApplication', 'runServer', 'buildProject', 'runApplication']);