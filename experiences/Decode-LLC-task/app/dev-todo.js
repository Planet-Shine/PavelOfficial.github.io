const applicationModule = angular.module('todo', [
    'ngMaterial',
    'ngResource',
    'ngCookies'
]);

require('./layout-fixes');

// Сервисы.
require('./resource/account')(applicationModule);
require('./resource/project')(applicationModule);
require('./resource/task')(applicationModule);

require("./styl/index.less"); // Собираем стили.

require('./todo.config')(applicationModule);
require('./todo/todo.controller')(applicationModule);