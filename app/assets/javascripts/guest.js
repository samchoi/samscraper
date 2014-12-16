(function(){
  
  var app = angular.module('guestList', []);

  var guestController = app.controller('GuestController', ['$scope', '$http', function($scope, $http){
    $scope.guests = gon.guests || [];

    $scope.guest = {};

    $scope.emptyGuest = function(){
      return Object.getOwnPropertyNames($scope.guest).length == 0;
    };

    $scope.getGuest = function(){
      $http.get(['guest_search', $('#search').val()].join('/')).success(function(data){
        $scope.guest = data;
        if(data == "null"){
          $scope.guest = {};
          $('#message').html('Oops! Couldn\'t find your butt');
        }
      });
    };

    $scope.setGuest = function(guest){
      $scope.guest = guest;
    };

    $scope.checkSearch = function(){
      return document.getElementById('search').value == "";
    };

    $scope.rsvpCount = function(status){
      //not liking this because I really should be checking for .status
      var checked = $('input:radio:checked');
      var rsvp_count = 0;
      for(var i in checked){
        if (checked[i].value == status){
          rsvp_count += 1;
        }
      }
      return rsvp_count;
    };

    $scope.addGuest = function(){
      if($scope.guest.id){
        $scope.guest.rsvp = $scope.rsvpCount('yes');
        $http.put('guests/'+ $scope.guest.id +'.json', { 'guest': $scope.guest})
        .success(function(data){
          $scope.guest = {};
          $('#search').val("");
          $('#message').html('Thanks! See you in June!');
        }).error(function(){});
        return;
      }

      $http.post('guests.json', { 'guest': $scope.guest})
        .success(function(data){
          $scope.guest = {};
          //display success message
        }).error(function(){});

    };

  }]);

  
  
  app.directive('guestRsvpList', function(){
    return {
      restrict: 'E',
      templateUrl: 'guests/0/template/guest-rsvp-list',
      controller: ['$scope', function($scope){

        $scope.guestCount = function(guest){
          var counter = [];
          for(var i = 1; i <= guest.guest_count; i++){
            counter.push(i);
          }
          return counter.length == 0 ? [1] : counter;
        };
      }]
    };
  });

})();