

angular
    .module('employeeCatalog')
    .service('employeeData', ['$http', 'localStorageService', function ($http, localStorageService) {
        var data,
            employeeData,
            callbacks = [];

        function margeData (data) {
            var departments = data.departments,
                employees   = data.employees,
                photos      = data.photos;

            employees.forEach(function (employee) {
                var photoId = employee.photo,
                    photo   = _.findWhere(photos, {
                            'id' : photoId
                        }) || {},
                    department = _.findWhere(departments, {
                            'id' : employee.department
                        }) || {};

                employee.photo        = photo['data'] || null;
                employee.department   = department || null;
                employee.departmentId = department.id || null;
            });

            return data;
        }


        this.getData = function (callback) {
            if (employeeData) {
                callback(employeeData);
            } else if (localStorageService.isSupported) {
                employeeData = localStorageService.get('employeeData');
                if (employeeData) {
                    employeeData = margeData(employeeData);
                    callback(employeeData);
                } else {
                    getDataThroughHttp();
                }
            } else {
                getDataThroughHttp();
            }

            function getDataThroughHttp () {
                $http.get('./data.json')
                    .then(function (response) {
                        employeeData = response.data;
                        if (localStorageService.isSupported) {
                            localStorageService.set('employeeData', employeeData);
                        }
                        employeeData = margeData(employeeData);
                        callback(margeData(employeeData));
                    });
            }
        };

    }]);