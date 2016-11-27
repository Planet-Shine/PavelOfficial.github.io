

angular
    .module('departmentList')
    .component('departmentList', {
        'templateUrl' : 'js/department/departmentList.template.html',
        'controller' : ['employeeData', '$scope', 'localStorageService', function (employeeData, $scope, localStorageService) {
            var self = this;
            this.departmentList = [];

            this.setDepartmentList = function (departmentList) {
                this.departmentList = departmentList;
            };

            employeeData.afterDataIsInLocalStorage(function () {
                var ids    = localStorageService.get('departmentsIds'),
                    result = ids.map(function (id) {
                        return localStorageService.get('departments#' + id);
                    });
                self.setDepartmentList(result);
            });
        }]
    });