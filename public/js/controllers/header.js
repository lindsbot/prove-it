angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        "title": "Quiz!",
        "link": "quiz"
    }];
    
    $scope.isCollapsed = false;
}]);

