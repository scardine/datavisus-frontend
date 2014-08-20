angular.module('Datavisus', ['ui.bootstrap', 'ngCookies', 'ngSanitize'])
    .constant('apiRoot', 'http://datavisus-desenv.seade.net/servicos/v1/')
    .controller('MasterCtrl', function($scope, $cookieStore, $sce, $window, Model) {
        /**
         * Sidebar Toggle & Cookie Control
         *
         */
        var mobileView = 992;
        var Chart = new Model({list: 'admin_documentos/', load: 'documentos/', save: 'documentos/'});
		var Template = new Model('admin_templates');
		
		$scope.Chart = Chart;
        $scope.chart_list = [];
		$scope.templateWindow = {
			isCollapsed: false,
			isVisible: false,
			current: undefined,
			list: Template.list()
		};

        $scope.chartUrl = function (chart)
        {
            return $sce.trustAsResourceUrl(
                'http://datavisus-desenv.seade.net/documentos/' + chart.id + '?ts=' + (chart._ts == undefined ? '' : chart._ts)
            )
        };

        $scope.getWidth = function() { return $window.innerWidth; };

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

        $window.onresize = function() { $scope.$apply(); };
    });

