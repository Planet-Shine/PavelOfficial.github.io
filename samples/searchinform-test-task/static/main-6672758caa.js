!function(e){try{e=angular.module("employeeTemplates")}catch(n){e=angular.module("employeeTemplates",[])}e.run(["$templateCache",function(e){"use strict";e.put("js/department/departmentList.template.html",'\n<div class="page-header jumbotron">\n    <h1>Отделы</h1>\n</div>\n\n<div class="employee-catalog container">\n    <ul>\n        <li class="col-lg-4 col-md-6 col-sm-6" ng-repeat="department in $ctrl.departmentList">\n            <a class="department-button" href="#!/departments/{{department.id}}/employees">\n                <span>{{department.name}}</span>\n            </a>\n        </li>\n    </ul>\n</div>\n<footer class="footer">\n</footer>'),e.put("js/avatarUploader/avatarUploader.template.html",'<div class="avatar-image-input-box">\n    <input accept=".gif,.bmp,.jpg,.jpeg,.png,.svg"\n           type="file"\n           ng-model="$ctrl.avatarUrl"\n           onchange="angular.element(this).scope().uploadImage(this.files)" />\n</div>\n<button type="button"\n        class="avatar-image-button btn btn-default btn-s"\n        onclick="$(this).closest(\'avatar-uploader\').find(\'input[type=\\\'file\\\']\').click()">\n    <span class="glyphicon glyphicon-upload"></span> аватар\n</button>\n\n<span class="error-message" ng-if="$ctrl.isNotValidType">\n    Недопустимый тип файла.\n</span>\n<span class="error-message" ng-if="$ctrl.isNotValidSize">\n    Недопустимый размер. Превышено {{$ctrl.maxAvatarKBSize}}КБ.\n</span>'),e.put("js/employee/employee.template.html",'\n\n\n<div class="page-header jumbotron">\n    <h1 ng-if="$ctrl.employee">\n        Сотрудник\n    </h1>\n    <h1 ng-if="!$ctrl.employee">\n        Нет такого сотрудника\n    </h1>\n</div>\n\n<div class="employee-navbar">\n    <nav class="navbar navbar-default container employee-navbar">\n        <div class="container-fluid">\n            <a class="navbar-brand" href="#!/departments/">\n                Отделы\n            </a>\n            <a ng-if="$ctrl.department" class="navbar-brand" href="#!/departments/{{$ctrl.department.id}}/employees">\n                {{$ctrl.department.name}}\n            </a>\n        </div>\n    </nav>\n</div>\n\n<div ng-if="$ctrl.employee" class="employee-catalog container">\n    <div class="media employee-item" ng-if="$ctrl.employee">\n        <div class="media-left avatar">\n            <img class="avatar-image" data-ng-src="{{ $ctrl.photoData }}">\n            <avatar-uploader on-new-avatar="$ctrl.setNewPhoto(avatar)"></avatar-uploader>\n        </div>\n        <div class="media-body">\n            <h4>{{ $ctrl.employee.name }}</h4>\n            <p>\n                <span class="field-hint">Телефон:</span> {{ $ctrl.employee.phone }}\n            </p>\n            <p>\n                <span class="field-hint">Отдел:</span> {{ $ctrl.department.name }}\n            </p>\n        </div>\n    </div>\n</div>\n<footer class="footer">\n</footer>\n\n'),e.put("js/employee/employeeList.template.html",'\n<div class="page-header jumbotron">\n    <div ng-if="$ctrl.department">\n        <h1>Сотрудники</h1>\n        <h2>отдела «{{$ctrl.department.name}}»</h2>\n    </div>\n    <h2 ng-if="!$ctrl.department">\n        Нет такого отдела\n    </h2>\n</div>\n\n<div class="employee-navbar">\n    <nav class="navbar navbar-default container employee-navbar department-list-container">\n        <div class="container-fluid">\n            <a class="navbar-brand" href="#!/departments/">Отделы</a>\n        </div>\n    </nav>\n</div>\n\n<div ng-if="$ctrl.department" class="employee-catalog container department-list-container">\n    <h3 class="official-info-header" ng-if="!$ctrl.employeeList.length">Отдел пуст</h3>\n    <h3 class="employee-count">{{ $ctrl.employeeList.length }} сотрудник{{ ($ctrl.employeeList.length > 10 && $ctrl.employeeList.length < 19) ? \'ов\' : {\n            0 : \'ов\',\n            1 : \'\',\n            2 : \'а\',\n            3 : \'а\',\n            4 : \'а\',\n            5 : \'ов\',\n            6 : \'ов\',\n            7 : \'ов\',\n            8 : \'ов\',\n            9 : \'ов\',\n        }[$ctrl.employeeList.length % 10] }}:</h3>\n    <ul>\n        <li class="media employee-item" ng-repeat="employee in $ctrl.employeeList">\n            <div class="media-left">\n                <a href="#!/employees/{{employee.id}}"\n                   class="btn btn-default pull-right" >\n                    <div class="glyphicon glyphicon-file"></div>\n                </a>\n            </div>\n            <div class="media-body">\n                <h4>{{employee.name}}</h4>\n            </div>\n        </li>\n    </ul>\n</div>\n<footer class="footer">\n</footer>')}])}();
angular.module("employeeCatalog",["ngAnimate","employeeTemplates","LocalStorageModule","ngRoute","avatarUploader","departmentList","employeeList","employee"]);
angular.module("employeeCatalog").config(["$locationProvider","$routeProvider","localStorageServiceProvider",function(e,t,l){l.setPrefix("employeeCatalog"),e.hashPrefix("!"),t.when("/departments",{template:"<department-list></department-list>"}).when("/departments/:departmentId/employees",{template:"<employee-list></employee-list>"}).when("/employees/:employeeId",{template:"<employee></employee>"}).otherwise("/departments")}]);
angular.module("employeeCatalog").service("employeeData",["$http","localStorageService",function(e,t){function a(e){function a(e,a){var o,n=e[a];o=n.map(function(e){return e.id}),t.set(a+"Ids",o),n.forEach(function(e){t.set(a+"#"+e.id,e)})}a(e,"departments"),a(e,"employees"),a(e,"photos"),t.set("isThereEmployeeData",!0)}this.afterDataIsInLocalStorage=function(o){function n(){e.get("./data.json").then(function(e){t.isSupported&&a(e.data),o()})}var i;t.isSupported?(i=t.get("isThereEmployeeData"),i?o():n()):n()}}]);
angular.module("avatarUploader",[]);
angular.module("avatarUploader").component("avatarUploader",{bindings:{onNewAvatar:"&"},templateUrl:"js/avatarUploader/avatarUploader.template.html",controller:["$scope",function(a){var t=this;this.isNotValidType=!1,this.isNotValidSize=!1,this.avatarFormatRegexp=/^image\/(:?bmp)|(:?jpg)|(:?jpeg)|(:?png)|(:?gif)|(:?svg)$/,this.maxAvatarKBSize=15,this.maxAvatarSize=1024*this.maxAvatarKBSize,a.uploadImage=function(e){var i=new FileReader,r=e[0];return t.isNotValidType=!1,t.isNotValidSize=!1,t.avatarFormatRegexp.test(r.type)?r.size>t.maxAvatarSize?(t.isNotValidSize=!0,void a.$apply()):(i.onload=function(a){var e=a.target.result;t.onNewAvatar({avatar:e})},void i.readAsDataURL(r)):(t.isNotValidType=!0,void a.$apply())}}]});
angular.module("departmentList",[]);
angular.module("departmentList").component("departmentList",{templateUrl:"js/department/departmentList.template.html",controller:["employeeData","$scope","localStorageService",function(t,e,a){var n=this;this.departmentList=[],this.setDepartmentList=function(t){this.departmentList=t},t.afterDataIsInLocalStorage(function(){var t=a.get("departmentsIds"),e=t.map(function(t){return a.get("departments#"+t)});n.setDepartmentList(e)})}]});
angular.module("employee",[]);
angular.module("employee").component("employee",{templateUrl:"js/employee/employee.template.html",controller:["employeeData","$scope","$routeParams","localStorageService",function(e,t,o,a){var p=this,l=o.employeeId;this.photoData=null,this.employee=null,this.department=null,this.setNewPhoto=function(e){var o=a.get("photosIds"),l=Math.max.apply(null,o),s=String(parseInt(l,10)+1);o.push(s),a.set("photosIds",o),a.set("photos#"+s,{data:e,id:s}),p.photoData=e,p.employee.photo=s,a.set("employees#"+p.employee.id,p.employee),t.$apply()},this.setEmployee=function(e){this.employee=e},this.setDepartment=function(e){this.department=e},this.onAvatarChange=function(){var e=this.avatarUrl;console.log(e)},e.afterDataIsInLocalStorage(function(e){var t,o,s;t=a.get("employees#"+l),t&&(o=a.get("photos#"+t.photo),s=a.get("departments#"+t.department),o&&(p.photoData=o.data),p.setEmployee(t),p.setDepartment(s))})}]});
angular.module("employeeList",[]);
angular.module("employeeList").component("employeeList",{templateUrl:"js/employee/employeeList.template.html",controller:["employeeData","$scope","$routeParams","localStorageService",function(e,t,o,n){var s=this,a=o.departmentId;this.department={},this.employeeList=[],this.setEmployeeList=function(e){this.employeeList=e},this.setDepartment=function(e){this.department=e},e.afterDataIsInLocalStorage(function(){var e=n.get("employeesIds"),t=e.map(function(e){return n.get("employees#"+e)}).filter(function(e){return e.department===a});s.setEmployeeList(t),s.setDepartment(n.get("departments#"+a))})}]});
//# sourceMappingURL=maps/main-6672758caa.js.map