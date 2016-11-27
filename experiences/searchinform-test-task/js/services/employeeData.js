

angular
    .module('employeeCatalog')
    .service('employeeData', ['$http', 'localStorageService', function ($http, localStorageService) {
        var data;

        function saveToLocalStorage (data) {

            function setCollectionToLocalStorage (data, name) {
                var collection = data[name],
                    ids;

                ids = collection.map(function (item) {
                    return item.id;
                });
                localStorageService.set(name + 'Ids', ids);
                collection.forEach(function (item) {
                    localStorageService.set(name + '#' + item.id, item);
                });
            }

            setCollectionToLocalStorage(data, 'departments');
            setCollectionToLocalStorage(data, 'employees');
            setCollectionToLocalStorage(data, 'photos');

            localStorageService.set('isThereEmployeeData', true);
        }

        this.afterDataIsInLocalStorage = function (callback) {
            var isThereEmployeeData;
            if (localStorageService.isSupported) {
                isThereEmployeeData = localStorageService.get('isThereEmployeeData');
                if (isThereEmployeeData) {
                    callback();
                } else {
                    getDataThroughHttp();
                }
            } else {
                getDataThroughHttp();
            }

            function getDataThroughHttp () {
                $http.get('./data.json')
                    .then(function (response) {
                        if (localStorageService.isSupported) {
                            saveToLocalStorage(response.data);
                        }
                        callback();
                    });
            }
        };

    }]);