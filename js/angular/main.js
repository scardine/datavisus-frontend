angular.module('Datavisus', ['ui.bootstrap', 'ngCookies', 'ngSanitize'])
    .constant('apiRoot', 'http://datavisus/servicos/v1/')
    .controller('MasterCtrl', function($scope, $cookieStore, $sce, ChartModel) {
        /**
         * Sidebar Toggle & Cookie Control
         *
         */
        var mobileView = 992;
        var Chart = new ChartModel();
        $scope.Chart = Chart;
        $scope.charts = Chart.list();

        $scope.chartUrl = function (chart)
        {
            return $sce.trustAsResourceUrl(
                'http://datavisus.seade.gov.br/document/' + chart.id + '?ts=' + (chart._ts == undefined ? '' : chart._ts)
            )
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

