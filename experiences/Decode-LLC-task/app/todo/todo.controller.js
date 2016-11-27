export default function (applicationModule) {
    var TodoCtrl = ['$scope', '$accountResource', '$projectResource', '$taskResource', '$cookies', '$mdSidenav', function ($scope, $accountResource, $projectResource, $taskResource, $cookies, $mdSidenav) {
        var self               = this,
            session            = $cookies.get('session'),
            sessionGetTries    = 0,
            sessionGetMax      = 5,
            loaderModificators = {
                'showed' : 'page-cover_showed',
                'hidden' : 'page-cover_hidden',
                'hiding' : ''
            },
            loaderTimeout = 1000;

        $scope.account  = {};

        this.editingProjectName = '';
        this.newProjectName = '';
        this.searchText = '';
        this.formName = '';
        this.createTaskName = '';
        this.createTaskDescription = '';
        this.selectedProjectIndex = 0;
        this.searchInputHidden = true;
        this.projects = [];
        this.loaderModificator = loaderModificators['showed'];
        this.getCurrentProject = function () {
            return this.projects[this.selectedProjectIndex];
        };
        this.selectProject = function (index) {
            this.selectedProjectIndex = index;
        };
        this.reselectProject = function (index) {
            this.selectProject(this.selectedProjectIndex);
        };

        if (session) {
            checkSession();
        } else {
            getSession();
        }

        function checkSession (callback) {
            $accountResource.request('session', {'session' : session})
                .get()
                .$promise.then(function (data) {
                    loadAppData();
                }, function (error) {
                    getSession(callback);
                    // $accountResource.handleError(error);
                });
        }

        function loadAppData () {
            var requestCount  = 0,
                requestTarget = 2;

            $accountResource.request('account', {'session' : session})
                .get()
                .$promise.then(function (data) {
                    $scope.account = data.Account;
                    requestCount += 1;
                    next();
                }, $accountResource.handleError);

            $projectResource.request('fetch', {'session' : session})
                .get()
                .$promise.then(function (data) {
                    self.projects = data.projects;
                    requestCount += 1;
                    next();
                }, $projectResource.handleError);

            function next () {
                if (requestCount === requestTarget) {
                    self.initializeGui();
                }
            }

        }

        function getSession (callback) {
            $accountResource.request('signup', null)
                .save()
                .$promise.then(function (data) {
                if ($accountResource.isError(data)) {
                    $accountResource.handleError(data);
                } else {
                    session = data.session;
                    $cookies.put('session', session);
                    checkSession(callback);
                }
            }, function (error) {
                sessionGetTries += 1;
                if (sessionGetTries < sessionGetMax) {
                    getSession(callback);
                } else {
                    $accountResource.handleError(error);
                }
            });
        }

        this.replaceProject = function (target, newProject) {
            var index = this.projects.indexOf(target);
            this.projects.splice(index, 1, newProject);
            this.reselectProject();
        };

        this.initializeGui = function () {
            this.loaderModificator = loaderModificators['hiding'];
            setTimeout(function () {
                self.loaderModificator = loaderModificators['hidden'];
                $scope.$apply();
            }, loaderTimeout);
        };

        this.toggleSidePanel = function () {
            $mdSidenav('side-panel')
                .toggle()
                .then(function () {
                    console.log('ready!');
                });
        };

        this.openCreateTaskForm = function () {
            this.formName = 'createTask';
            this.toggleSidePanel();
        };

        this.openCreateProjectForm = function () {
            this.formName = 'createProject';
            this.toggleSidePanel();
        };

        this.openEditProjectForm = function () {
            this.editingProjectName = this.getCurrentProject().Project.title;
            this.formName           = 'editProject';
            this.toggleSidePanel();
        };

        this.fooValue = null;

        this.addProjectToList = function (project) {
            this.projects.push(project);
        };

        this.fetchProject = function (projectId) {
            $projectResource.request('fetch', {'session' : session, 'project_id' : projectId})
                .get()
                .$promise.then(function (data) {
                    var ids = self.projects.map(function (item) {
                            return item.Project.id;
                        }),
                        indexOfProject;
                    if ($accountResource.isError(data)) {
                        $accountResource.handleError(data);
                    } else {
                        indexOfProject = ids.indexOf(data.Project.id);
                        if (indexOfProject !== -1) {
                            self.replaceProject(self.projects[indexOfProject], {
                                'Project': data.Project
                            });
                        } else {
                            self.addProjectToList({
                                'Project': data.Project
                            });
                        }
                    }
                }, $projectResource.handleError);
        };

        this.editProject = function () {
            var currentProject = self.getCurrentProject(),
                projectName = this.editingProjectName;
            this.toggleSidePanel();
            $projectResource.request('update', {})
                .save({
                    'session' : session,
                    'Project' : {
                        'id'    : self.getCurrentProject().Project.id,
                        'title' : projectName
                    }
                })
                .$promise.then(function (data) {
                    if ($accountResource.isError(data)) {
                        $accountResource.handleError(data);
                    } else {
                        self.replaceProject(currentProject, {
                            'Project' : data.Project
                        });
                    }
                }, $projectResource.handleError);
        };

        this.createNewProject = function () {
            var projectName = this.newProjectName;


            this.newProjectName = '';
            this.toggleSidePanel();


            $projectResource.request('create', {})
                .save({
                    'session' : session,
                    'Project' : {
                        'title' : projectName
                    }
                })
                .$promise.then(function (data) {
                    if ($accountResource.isError(data)) {
                        $accountResource.handleError(data);
                    } else {
                        self.fetchProject(data.Project.id);
                    }
                }, $projectResource.handleError);

        };

        this.createNewTask = function () {
            var createTaskName        = this.createTaskName,
                createTaskDescription = this.createTaskDescription,
                currentProject        = this.getCurrentProject();

            $taskResource.request('create', {})
                .save({
                    'session' : session,
                    'Project' : {
                        'id' : currentProject.Project.id
                    },
                    'Task' : {
                        'title' : createTaskName,
                        'description' : createTaskDescription || ''
                    }
                })
                .$promise.then(function (data) {
                    if ($taskResource.isError(data)) {
                        $taskResource.handleError(data);
                    } else {
                        self.fetchProject(currentProject.Project.id);
                        self.toggleSidePanel();
                    }
                }, $projectResource.handleError);
        };

        this.deleteProject = function (project) {
            var index = this.projects.indexOf(project);
            this.projects.splice(index, 1);
        };

        this.deleteCurrentProject = function () {
            var project = this.projects[this.selectedProjectIndex];
            if (project) {
                $projectResource.request('create', {'session' : session, 'project_id' : project.Project.id})
                    .delete()
                    .$promise.then(function (data) {
                        if ($accountResource.isError(data)) {
                            $accountResource.handleError(data);
                        } else {
                            self.deleteProject(project);
                        }
                    }, $projectResource.handleError);
            }
        };

    }],
        ctrl     = applicationModule.controller('TodoCtrl', TodoCtrl);


    require('./profileInfo.directive.js')(ctrl);
};