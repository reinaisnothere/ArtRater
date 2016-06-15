var appModule = angular.module('app', []);

appModule.controller('AppController', function($http, $scope) {
  var order = [];
  var position = 0;
  $http({
    method: 'GET',
    url: '/submissions?count=true',
  })
  .then(function(results) {
    var count = results.data;
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
  })

  $scope.next = function(rating) {
    $http({
      method: 'PUT',
      data: { rating: rating },
      url: '/submissions/' + order[position]
    })
    .then(function() {
      position++;
      return $http({
        method: 'GET',
        url: '/submissions/' + order[position]
      })
    })
    .then(function(results) {
      $scope.submission = results.data;
    })
  }
  
  // $scope.places = [];
  // $scope.loading = false;
  // $scope.showError = false;
  // $scope.search = function() {
  //   $scope.loading = true;
  //   $scope.showError = false;
  //   $scope.places = [];
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     var latitude = position.coords.latitude;
  //     var longitude = position.coords.longitude;
  //     var location = latitude + ',' + longitude;
  //     $http({
  //       method: 'GET',
  //       url: '/places?' + 'keyword=' + $scope.keyword + '&location=' + location
  //     })
  //     .then(function(results) {
  //       $scope.loading = false;
  //       if (!results.data.results.length) {
  //         $scope.showError = true;
  //       } else {
  //         $scope.places = results.data.results.map(function(place) {
  //           return {
  //             vicinity: place.vicinity,
  //             name: place.name,
  //             url: place.name + ' ' + place.vicinity
  //           }
  //         });
  //       }
  //     }, function(err) {
  //       $scope.loading = false;
  //       $scope.showError = true;
  //     });
  //   });
  // }
});
