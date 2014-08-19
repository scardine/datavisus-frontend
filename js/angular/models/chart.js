angular.module('Datavisus')
    .factory('ChartModel', function($http, apiRoot) {
        var Chart = function() {
            var self = this;
            self._errors = [];
            self._error = function(data, status, xhr) {
                self._errors.push(data);
            };
        };

        Chart.prototype.list = function() {
            var ref = [];
            var self = this;
            return $http({
                url: apiRoot + 'admin_documentos/',
                method: 'GET'
            }).success(function(data, status, xhr) {
                ref.push.apply(ref, data);
            }).error(self._error);
            return ref;
        }

        Chart.prototype.load = function(id) {
            var self = this;
            var ref = {};
            $http({
                url: apiRoot + 'documentos/' + id,
                method: 'GET'
            }).success(function(data, status, xhr) {
                angular.extend(ref, data);
                ref.id = Math.abs(id);
            }).error(self._error);
            return ref;
        };

        Chart.prototype.save = function(data) {
            var self = this;
            var ref = {};
            $http({
                url: apiRoot + 'documentos/' + id,
                method: 'PUT',
                data: data
            }).success(function(data, status, xhr) {
                angular.extend(ref, data);
            }).error(self._error);
            return ref;
        };

        return Chart;
    });