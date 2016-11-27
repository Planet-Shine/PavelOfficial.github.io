

angular.
    module('employeeCatalog').
    config(['$locationProvider', '$routeProvider', 'localStorageServiceProvider',
        function config ($locationProvider, $routeProvider, localStorageServiceProvider) {

            localStorageServiceProvider.setPrefix('employeeCatalog');

            $locationProvider.hashPrefix('!');
            /*
                $locationProvider.html5Mode({
                    enabled : true,
                    requiredBase : false
                });
            */

            $routeProvider
                .when('/departments', {
                    template : '<department-list></department-list>'
                })
                .when('/departments/:departmentId/employees', {
                    template : '<employee-list></employee-list>'
                })
                .when('/employees/:employeeId', {
                    template : '<employee></employee>'
                })
                .otherwise('/departments');

        }]);