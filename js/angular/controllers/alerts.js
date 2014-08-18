/**
 * Alerts Controller
 */
angular.module('Datavisus')
    .controller('AlertsCtrl', function($scope) {
        $scope.alerts = [];

        $scope.addAlert = function() {
            $scope.alerts.push({msg: 'Another alert!'});
        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };
    });
