var appModule = angular.module('app', []);

appModule.controller('AppController', function($http, $scope) {
  var order = [];
  var position = 0;
  var count;
  $scope.more = true;
  $scope.end = false;

  $http({
    method: 'GET',
    url: '/submissions?count=true',
  })
  .then(function(results) {
    count = results.data;
    for (var i = 0; i < count; i++) {
      order.push(i);
    }
    for (var j = count - 1; j > 0; j--) { // unbiased shuffle to determine the random order of submissions shown to user
      var rand = Math.floor(Math.random() * j);
      var temp = order[rand];
      order[rand] = order[j];
      order[j] = temp;
    }
  })
  .then(function() {
    return $http({
      method: 'GET',
      url: '/submissions/' + order[0]
    });
  })
  .then(function(results) {
    $scope.submission = results.data;
  });

  $scope.next = function(rating) {
    $http({
      method: 'PUT',
      data: { rating: rating },
      url: '/submissions/' + order[position]
    })
    .then(function() {
      position++;
      if (position < count) {
        return $http({
          method: 'GET',
          url: '/submissions/' + order[position]
        })
        .then(function(results) {
          $scope.submission = results.data;
        })
      }
      $scope.more = false;
      $scope.end = true;
    });
  };
});
