

angular
    .module('departmentList')
    .component('departmentList', {
        'templateUrl' : 'js/department/departmentList.template.html',
        'controller' : ['employeeData', '$scope', function (employeeData, $scope) {
            var self = this;
            this.departmentList = [];
            employeeData.getData(function (data) {
                self.departmentList = data.departments;
                // $scope.$apply();
            });
        }]
    });