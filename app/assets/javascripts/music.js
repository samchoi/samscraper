(function(){
  
  var app = angular.module('songs', []);

  var musicController = app.controller('MusicController', ['$scope', '$http', function($scope, $http){
    $scope.songs = gon.songs || [];

    $scope.song = { id: 0 };

    $scope.allSongs = function(){
      return gon.songs;
    };

    $scope.isActiveSong = function(song){
      return song.id == $scope.song.id;
    };

    $scope.addSong = function(song){
      console.log('Add Song', song);
    };

    $scope.playSong = function(song){
      console.log('Play Song', song);
      var filename = gon.music_host + song.filename;
      $('#music').attr('src', filename);
      $('#controls span.name').html(song.name);
      $('#ticker').html(song.description);
      $('#controls .btn.add').data('id', song.id);
      $('#controls a.download').attr('href', '/ds/' + song.id)
      //start player
      $('#action').toggleClass('play');


      document.getElementById('music').play();

        $(document).title = 'thistrack.rocks'

        if (navigator.geolocation) {            
            //navigator.geolocation.getCurrentPosition(logPlay);
        }

      //$(this).toggleClass('inactive');
      //$(this).siblings('.pause').toggleClass('inactive');
    };

  }]);

  
  
  app.directive('songList', function(){
    return {
      restrict: 'E',
      templateUrl: 'song/0/template/song',
      controller: musicController
    };
  });

})();