angular.module('Datavisus')
    .factory('Model', function($http, apiRoot) {
        var Model = function(endpoint) {
            var self = this;
            self.errors = [];
            self.error = function(data, status, xhr) {
                self.errors.push(data);
            };
			if(typeof endpoint == 'string') {
				self.endpoint = {
					list: endpoint,
					load: endpoint,
					save: endpoint
				}
			} else {
				self.endpoint = {};
				self.endpoint = angular.extend(self.endpoint, endpoint);
			}
        };

        Model.prototype.list = function() {
            var ref = [];
            var self = this;
            $http({
                url: apiRoot + self.endpoint.list,
                method: 'GET'
            }).success(function(data, status, xhr) {
                ref.push.apply(ref, data);
            }).error(self.error);
            return ref;
        }

        Model.prototype.load = function(id) {
            var self = this;
            var ref = {};
            $http({
                url: apiRoot + self.endpoint.load + id,
                method: 'GET'
            }).success(function(data, status, xhr) {
                angular.extend(ref, data);
            }).error(self.error);
            return ref;
        };

        Model.prototype.save = function(data) {
            var self = this;
            var ref = {};
            $http.put(apiRoot + self.endpoint.save, data)
            .success(function(data, status, xhr) {
                angular.extend(ref, data);
            }).error(self.error);
            return ref;
        };

        return Model;
    });