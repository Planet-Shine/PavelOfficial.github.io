export default (applicationModule) => {
    applicationModule.config([
        '$mdThemingProvider',
        function ($mdThemingProvider) {
            $mdThemingProvider.theme('grey');
        }]);
};