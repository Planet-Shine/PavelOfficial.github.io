//HEAD 
(function(app) {
try { app = angular.module("employeeTemplates"); }
catch(err) { app = angular.module("employeeTemplates", []); }
app.run(["$templateCache", function($templateCache) {
"use strict";

$templateCache.put("js/department/departmentList.template.html","\n" +
    "<div class=\"page-header jumbotron\">\n" +
    "    <h1>Отделы</h1>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"employee-catalog container\">\n" +
    "    <ul>\n" +
    "        <li class=\"col-lg-3 col-md-4 col-sm-6\" ng-repeat=\"department in $ctrl.departmentList\">\n" +
    "            <a class=\"department-button\" href=\"#!/departments/{{department.id}}/employees\">\n" +
    "                <span>{{department.name}}</span>\n" +
    "            </a>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</div>\n" +
    "<footer class=\"footer\">\n" +
    "</footer>")

$templateCache.put("js/employee/employee.template.html","\n" +
    "\n" +
    "\n" +
    "<div class=\"page-header jumbotron\">\n" +
    "    <h1>Сотрудник</h1>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"employee-navbar\">\n" +
    "    <nav class=\"navbar navbar-default container employee-navbar\">\n" +
    "        <div class=\"container-fluid\">\n" +
    "            <a class=\"navbar-brand\" href=\"#!/departments/\">\n" +
    "                Отделы\n" +
    "            </a>\n" +
    "            <a class=\"navbar-brand\" href=\"#!/departments/{{$ctrl.employee.department.id}}/employees\">\n" +
    "                {{$ctrl.employee.department.name}}\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </nav>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"employee-catalog container\">\n" +
    "    <div class=\"media employee-item\">\n" +
    "        <div class=\"media-left\">\n" +
    "            <img class=\"avatar-image\" data-ng-src=\"{{ $ctrl.employee.photo }}\">\n" +
    "        </div>\n" +
    "        <div class=\"media-body\">\n" +
    "            <h4>{{ $ctrl.employee.name }}</h4>\n" +
    "            <p>\n" +
    "                <span class=\"field-hint\">Телефон:</span> {{ $ctrl.employee.phone }}\n" +
    "            </p>\n" +
    "            <p>\n" +
    "                <span class=\"field-hint\">Отдел:</span> {{ $ctrl.employee.department.name }}\n" +
    "            </p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<footer class=\"footer\">\n" +
    "</footer>\n" +
    "\n" +
    "")

$templateCache.put("js/employee/employeeList.template.html","\n" +
    "<div class=\"page-header jumbotron\">\n" +
    "    <h1>Сотрудники</h1>\n" +
    "    <h2>отдела «{{$ctrl.department.name}}»</h2>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"employee-navbar\">\n" +
    "    <nav class=\"navbar navbar-default container employee-navbar\">\n" +
    "        <div class=\"container-fluid\">\n" +
    "            <a class=\"navbar-brand\" href=\"#!/departments/\">Отделы</a>\n" +
    "        </div>\n" +
    "    </nav>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"employee-catalog container\">\n" +
    "    <h3 class=\"official-info-header\" ng-if=\"!$ctrl.employeeList.length\">Отдел пуст</h3>\n" +
    "    <ul>\n" +
    "        <li class=\"media employee-item col-lg-4 col-md-6 col-sm-6\" ng-repeat=\"employee in $ctrl.employeeList\">\n" +
    "            <!-- <div alt=\"{{employee.name}}\"\n" +
    "                 style=\"width: 150px; height:150px;\"\n" +
    "                 ng-style=\"{'background-image' : 'url(\\'' + employee.photo.data + '\\')'}\">\n" +
    "            </div> -->\n" +
    "            <div class=\"media-left\">\n" +
    "                <a href=\"#!/employees/{{employee.id}}\">\n" +
    "                    <img class=\"avatar-image\" data-ng-src=\"{{employee.photo}}\">\n" +
    "                </a>\n" +
    "            </div>\n" +
    "            <div class=\"media-body\">\n" +
    "                <h4>{{employee.name}}</h4>\n" +
    "                <p>\n" +
    "                    <span class=\"field-hint\">Телефон:</span> {{employee.phone}}\n" +
    "                </p>\n" +
    "            </div>\n" +
    "            <div class=\"media-right\">\n" +
    "                <a href=\"#!/employees/{{employee.id}}\"\n" +
    "                   class=\"btn btn-default pull-right\" >\n" +
    "                    <div class=\"glyphicon glyphicon-file\"></div>\n" +
    "                </a>\n" +
    "            </div>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</div>\n" +
    "<footer class=\"footer\">\n" +
    "</footer>")
}]);
})();