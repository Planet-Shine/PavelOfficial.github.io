

angular
    .module('employee')
    .component('employee', {
        'templateUrl' : 'js/employee/employee.template.html',
        'controller' : ['employeeData', '$scope', '$routeParams', function (employeeData, $scope, $routeParams) {
            var self       = this,
                employeeId = $routeParams.employeeId;

            this.employee = null;
            this.getPhoto = function () {
                return this.employee.photo.data;
            };
            this.setEmployee = function (employee) {
                this.employee = employee;
            };
            employeeData.getData(function (data) {
                self.setEmployee(_.findWhere(data.employees, {
                    'id' : employeeId
                }));
            });
        }]
    });