!function(e){try{e=angular.module("employeeTemplates")}catch(n){e=angular.module("employeeTemplates",[])}e.run(["$templateCache",function(e){"use strict";e.put("js/department/departmentList.template.html",'\n<div class="page-header jumbotron">\n    <h1>Отделы</h1>\n</div>\n\n<div class="employee-catalog container">\n    <ul>\n        <li class="col-lg-3 col-md-4 col-sm-6" ng-repeat="department in $ctrl.departmentList">\n            <a class="department-button" href="#!/departments/{{department.id}}/employees">\n                <span>{{department.name}}</span>\n            </a>\n        </li>\n    </ul>\n</div>\n<footer class="footer">\n</footer>'),e.put("js/employee/employee.template.html",'\n\n\n<div class="page-header jumbotron">\n    <h1>Сотрудник</h1>\n</div>\n\n<div class="employee-navbar">\n    <nav class="navbar navbar-default container employee-navbar">\n        <div class="container-fluid">\n            <a class="navbar-brand" href="#!/departments/">\n                Отделы\n            </a>\n            <a class="navbar-brand" href="#!/departments/{{$ctrl.employee.department.id}}/employees">\n                {{$ctrl.employee.department.name}}\n            </a>\n        </div>\n    </nav>\n</div>\n\n<div class="employee-catalog container">\n    <div class="media employee-item">\n        <div class="media-left">\n            <img class="avatar-image" data-ng-src="{{ $ctrl.employee.photo }}">\n        </div>\n        <div class="media-body">\n            <h4>{{ $ctrl.employee.name }}</h4>\n            <p>\n                <span class="field-hint">Телефон:</span> {{ $ctrl.employee.phone }}\n            </p>\n            <p>\n                <span class="field-hint">Отдел:</span> {{ $ctrl.employee.department.name }}\n            </p>\n        </div>\n    </div>\n</div>\n<footer class="footer">\n</footer>\n\n'),e.put("js/employee/employeeList.template.html",'\n<div class="page-header jumbotron">\n    <h1>Сотрудники</h1>\n    <h2>отдела «{{$ctrl.department.name}}»</h2>\n</div>\n\n<div class="employee-navbar">\n    <nav class="navbar navbar-default container employee-navbar">\n        <div class="container-fluid">\n            <a class="navbar-brand" href="#!/departments/">Отделы</a>\n        </div>\n    </nav>\n</div>\n\n<div class="employee-catalog container">\n    <h3 class="official-info-header" ng-if="!$ctrl.employeeList.length">Отдел пуст</h3>\n    <ul>\n        <li class="media employee-item col-lg-4 col-md-6 col-sm-6" ng-repeat="employee in $ctrl.employeeList">\n            <!-- <div alt="{{employee.name}}"\n                 style="width: 150px; height:150px;"\n                 ng-style="{\'background-image\' : \'url(\\\'\' + employee.photo.data + \'\\\')\'}">\n            </div> -->\n            <div class="media-left">\n                <a href="#!/employees/{{employee.id}}">\n                    <img class="avatar-image" data-ng-src="{{employee.photo}}">\n                </a>\n            </div>\n            <div class="media-body">\n                <h4>{{employee.name}}</h4>\n                <p>\n                    <span class="field-hint">Телефон:</span> {{employee.phone}}\n                </p>\n            </div>\n            <div class="media-right">\n                <a href="#!/employees/{{employee.id}}"\n                   class="btn btn-default pull-right" >\n                    <div class="glyphicon glyphicon-file"></div>\n                </a>\n            </div>\n        </li>\n    </ul>\n</div>\n<footer class="footer">\n</footer>')}])}();
angular.module("employeeCatalog",["ngAnimate","employeeTemplates","LocalStorageModule","ngRoute","departmentList","employeeList","employee"]);
angular.module("employeeCatalog").config(["$locationProvider","$routeProvider","localStorageServiceProvider",function(e,t,l){l.setPrefix("employeeCatalog"),e.hashPrefix("!"),t.when("/departments",{template:"<department-list></department-list>"}).when("/departments/:departmentId/employees",{template:"<employee-list></employee-list>"}).when("/employees/:employeeId",{template:"<employee></employee>"}).otherwise("/departments")}]);
angular.module("employeeCatalog").service("employeeData",["$http","localStorageService",function(e,t){function a(e){var t=e.departments,a=e.employees,n=e.photos;return a.forEach(function(e){var a=e.photo,o=_.findWhere(n,{id:a})||{},r=_.findWhere(t,{id:e.department})||{};e.photo=o.data||null,e.departmentId=e.department||null,e.department=r||null}),e}var n;this.getData=function(o){function r(){e.get("./data.json").then(function(e){n=e.data,t.isSupported&&t.set("employeeData",n),n=a(n),o(a(n))})}n?o(n):t.isSupported?(n=t.get("employeeData"),n?(n=a(n),o(n)):r()):r()}}]);
angular.module("departmentList",[]);
angular.module("departmentList").component("departmentList",{templateUrl:"js/department/departmentList.template.html",controller:["employeeData","$scope",function(t,e){var a=this;this.departmentList=[],t.getData(function(t){a.departmentList=t.departments})}]});
angular.module("employee",[]);
angular.module("employee").component("employee",{templateUrl:"js/employee/employee.template.html",controller:["employeeData","$scope","$routeParams",function(e,t,o){var l=this,m=o.employeeId;this.employee=null,this.getPhoto=function(){return this.employee.photo.data},this.setEmployee=function(e){this.employee=e},e.getData(function(e){l.setEmployee(_.findWhere(e.employees,{id:m}))})}]});
angular.module("employeeList",[]);
angular.module("employeeList").component("employeeList",{templateUrl:"js/employee/employeeList.template.html",controller:["employeeData","$scope","$routeParams",function(e,t,m){var s=this,o=m.departmentId;this.department={},this.employeeList=[],this.setEmployeeList=function(e){this.employeeList=e},this.setDepartment=function(e){this.department=e},e.getData(function(e){s.setEmployeeList(_.where(e.employees,{departmentId:o})),s.setDepartment(_.findWhere(e.departments,{id:o}))})}]});
//# sourceMappingURL=maps/main-c27f950294.js.map