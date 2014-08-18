var app = angular.module('Datavisus', ['ui.bootstrap', 'ngCookies', 'ngSanitize']);

/**
 * Master Controller
 */
app.controller('MasterCtrl', function($scope, $cookieStore, $sce) {

    /**
     * Sidebar Toggle & Cookie Control
     *
     */
    var mobileView = 992;

    $scope.charts = [
        {
            isCollapsed: false,
            id: 1101,
            url: 'http://datavisus.seade.gov.br/document/1101'
        }
    ];

    $scope.chartUrl = function (chart)
    {
        return $sce.trustAsResourceUrl('http://datavisus.seade.gov.br/document/' + chart.id)
    };

    $scope.getWidth = function() { return window.innerWidth; };

    $scope.$watch($scope.getWidth, function(newValue, oldValue)
    {
        if(newValue >= mobileView)
        {
            if(angular.isDefined($cookieStore.get('toggle')))
            {
                if($cookieStore.get('toggle') == false)
                {
                    $scope.toggle = false;
                }            
                else
                {
                    $scope.toggle = true;
                }
            }
            else 
            {
                $scope.toggle = true;
            }
        }
        else
        {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() 
    {
        $scope.toggle = ! $scope.toggle;

        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() { $scope.$apply(); };
});

