// bundle.config.js
var lazypipe = require('lazypipe');
var sass = require('gulp-sass');
var gif = require('gulp-if');

function stringEndsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

// only run transforms against certain file types.
// This is only necessary if your bundle has a mix of file types in it
function isScssFile(file) {
    return stringEndsWith(file.relative, 'sass');
}

// pipe as many transforms together as you like
var styleTransforms = lazypipe()
    .pipe(function() {
        // when using lazy pipe you need to call gulp-if from within an anonymous func
        // https://github.com/robrich/gulp-if#works-great-inside-lazypipe
        return gif(isScssFile, sass());
    });

module.exports = {
    bundle: {
        main: {
            scripts: [
                './app/templates/employeeTemplates.js',
                './app/js/app.module.js',
                './app/js/app.config.js',
                './app/js/services/employeeData.js',
                './app/js/avatarUploader/avatarUploader.module.js',
                './app/js/avatarUploader/avatarUploader.component.js',
                './app/js/department/departmentList.module.js',
                './app/js/department/departmentList.component.js',
                './app/js/employee/employee.module.js',
                './app/js/employee/employee.component.js',
                './app/js/employee/employeeList.module.js',
                './app/js/employee/employeeList.component.js'
            ],
            styles: [
                './node_modules/bootstrap/dist/css/bootstrap.css',
                './app/styl/*.sass'
            ],
            options: {
                transforms: {
                    styles: styleTransforms
                }
            }
        },
        vendor: {
            scripts: [
                './node_modules/jquery/dist/jquery.js',
                './node_modules/bootstrap/dist/js/bootstrap.js',
                './node_modules/underscore/underscore.js',
                './node_modules/angular/angular.js',
                './node_modules/angular-animate/angular-animate.js',
                './node_modules/angular-local-storage/dist/angular-local-storage.js',
                './node_modules/angular-route/angular-route.js'
            ]
        }
    }//,
    // copy: './node_modules/bootstrap/fonts/**/*.*'
};