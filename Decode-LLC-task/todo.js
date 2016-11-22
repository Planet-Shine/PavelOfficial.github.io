require('angular-material');
require('angular-resource');
require('angular-filter');
require('angular-cookies');
require('angular-aria');
require('angular-animate');

const angular = require('angular');
const applicationModule = angular.module('todo', [
    'ngMaterial',
    'ngResource',
    'ngCookies',
    'angular.filter'
]);

require('./layout-fixes');

// Сервисы.
require('./resource/account')(applicationModule);
require('./resource/project')(applicationModule);
require('./resource/task')(applicationModule);

require('./todo/filters/formatDate.js')(applicationModule);

require("./styl/index.less"); // Собираем стили.

require('./todo.config')(applicationModule);
require('./todo/todo.component')(applicationModule);
require('./todo/projectList/projectList.component')(applicationModule);
require('./todo/searchView/searchView.component')(applicationModule);
require('./todo/forms/createProject.form.component')(applicationModule);
require('./todo/forms/editProject.form.component')(applicationModule);
require('./todo/forms/createTask.form.component')(applicationModule);
require('./todo/forms/editTask.form.component')(applicationModule);
require('./todo/taskList/taskList.component')(applicationModule);
require('./todo/taskInfo/taskInfo.component')(applicationModule);


