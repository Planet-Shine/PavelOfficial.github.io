

angular
    .module('employeeList')
    .component('employeeList', {
        'templateUrl' : 'js/employee/employeeList.template.html',
        'controller'  : ['employeeData', '$scope', '$routeParams', function (employeeData, $scope, $routeParams) {
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
            employeeData.getData(function (data) {
                self.setEmployeeList(_.where(data.employees, {
                    'departmentId' : departmentId
                }));
                self.setDepartment(_.findWhere(data.departments, {
                    'id' : departmentId
                }));
            });
        }]
    });