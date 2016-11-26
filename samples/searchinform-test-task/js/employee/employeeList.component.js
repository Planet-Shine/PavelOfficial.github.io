

angular
    .module('employeeList')
    .component('employeeList', {
        'templateUrl' : 'js/employee/employeeList.template.html',
        'controller'  : ['employeeData', '$scope', '$routeParams', 'localStorageService', function (employeeData, $scope, $routeParams, localStorageService) {
            var self         = this,
                departmentId = $routeParams.departmentId;

            this.department   = {};
            this.employeeList = [];
            this.setEmployeeList = function (employeeList) {
                this.employeeList = employeeList;
            };
            this.setDepartment = function (department) {
                this.department = department;
            };
            employeeData.afterDataIsInLocalStorage(function () {
                var ids    = localStorageService.get('employeesIds'),
                    result = ids.map(function (id) {
                        return localStorageService.get('employees#' + id);
                    }).filter(function (employee) {
                        return employee.department === departmentId;
                    });
                self.setEmployeeList(result);
                self.setDepartment(localStorageService.get('departments#' + departmentId));
            });

        }]
    });