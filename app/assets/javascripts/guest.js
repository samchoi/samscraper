(function(){
  
  var app = angular.module('guestList', []);

  var guestController = app.controller('GuestController', ['$scope', '$http', function($scope, $http){
    $scope.guests = [];
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

    $scope.countRsvps = function(){
      var checked = $('input:radio:checked');
      var rsvps = { yes: [], no: []};
      for(var i in checked){
        var response = checked[i];
        if(response == 'yes'){
          rsvps.yes.push(response.id);
        }else{
          rsvps.no.push(response.id);
        }
      }
      return rsvps;
    };

    $scope.addGuest = function(){
      if($scope.guest.id){        
        $http.put('guests/'+ $scope.guest.id +'.json', { guest: $scope.guest, rsvps: $scope.countRsvps()})
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