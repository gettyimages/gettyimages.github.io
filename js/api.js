(function() {
  var app = angular.module('api', []);

  app.directive('searchDemo', function() {
    return {
      restrict: 'E',
      templateUrl: 'search.html'
    }
  });

  app.controller('SearchController', ['$http', '$scope', function($http, $scope) {

    $scope.request = {
      page_size: 15,
      page: 1,
      phrase: 'dog',
      fields: 'id,title,thumb',
      sort_order: 'best'
    };

    $scope.sort_orders = ['best', 'most_popular', 'newest'];
    $scope.status_codes = [{
      code: 200,
      message: 'Success'
    }, {
      code: 400,
      message: 'InvalidPage'
    }, {
      code: 400,
      message: 'MalformedRequest'
    }, {
      code: 400,
      message: 'InvalidParameterValue'
    }, {
      code: 400,
      message: 'UnknownProviderUri'
    }, {
      code: 400,
      message: 'IncorrectlyFormedUri'
    }, {
      code: 401,
      message: 'AuthorizationTokenRequired'
    }, {
      code: 403,
      message: 'UnauthorizedDisplaySize'
    }, {
      code: 403,
      message: 'NoAccessToProductType'
    }];

    $scope.send = function(request) {

      $scope.isLoading = true;

      if (!request.page) {
        delete request.page
      }

      if (!request.phrase) {
        delete request.phrase;
      }

      if (!request.page_size) {
        delete request.page_size;
      }

      if (!request.sort_order) {
        delete request.sort_order;
      }

      var req = {
        method: 'GET',
        url: 'https://api.gettyimages.com/v3/search/images',
        headers: {
          'Api-Key': '7wjf4bsm2gpahzdm6yetrz2t'
        },
        params: request
      };

      $scope.apirequest = req.url + '?' + serialize(req.params);
      $http(req).success(function(data, status, headers, config) {
        $scope.isLoading = false;
        $scope.apiresponse = data;
        $scope.responsecode = status;
      }).error(function(data, status, headers, config) {
        $scope.isLoading = false;
        $scope.apiresponse = data;
        $scope.responsecode = status;
      });
    };

  }]);

  var serialize = function(dictionary) {
    var query = []
    for (key in dictionary) {
      query.push(key + '=' + dictionary[key]);
    }

    return query.join('&');
  }

})();
