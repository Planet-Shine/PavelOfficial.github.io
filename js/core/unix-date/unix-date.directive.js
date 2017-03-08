
angular
    .module('core.unixDate')
    .directive('unixDate', function () {
        return {
            restrict: "EA",
            replace: true,
            scope: true,
            templateUrl: "/js/core/unix-date/unix-date.template.html",
            link: function (scope, element, attributes) {
                var date = new Date(attributes.unixtime * 1000);
                scope.year = date.getFullYear();
                scope.month = consts.GENITIVE_MONTHS[date.getMonth()];
                scope.date = date.getDate();
            }
        };
    });
