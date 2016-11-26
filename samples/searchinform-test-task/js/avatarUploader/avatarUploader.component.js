

angular
    .module('avatarUploader')
    .component('avatarUploader', {
        bindings : {
            onNewAvatar : '&'
        },
        templateUrl : 'js/avatarUploader/avatarUploader.template.html',
        controller : ['$scope', function ($scope) {
            var self = this;
            this.isNotValidType = false;
            this.isNotValidSize = false;
            this.avatarFormatRegexp = /^image\/(:?bmp)|(:?jpg)|(:?jpeg)|(:?png)|(:?gif)|(:?svg)$/;
            this.maxAvatarKBSize = 15;
            this.maxAvatarSize = this.maxAvatarKBSize * 1024;

            $scope.uploadImage = function (files) {
                var reader = new FileReader(),
                    file = files[0];

                self.isNotValidType = false;
                self.isNotValidSize = false;
                if (!self.avatarFormatRegexp.test(file.type)) {
                    self.isNotValidType = true;
                    $scope.$apply();
                    return;
                } else if (file.size > self.maxAvatarSize) {
                    self.isNotValidSize = true;
                    $scope.$apply();
                    return;
                }

                reader.onload = function(event) {
                    var result = event.target.result;
                    self.onNewAvatar({
                        'avatar' : result
                    });
                };
                reader.readAsDataURL(file);
            };
        }]
    });

