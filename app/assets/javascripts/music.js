(function(){
  
  var app = angular.module('songs', []);

  var musicController = app.controller('MusicController', ['$scope', '$http', function($scope, $http){
    $scope.songs = gon.songs || [];

    $scope.song = gon.song || { id: 0 };

    $scope.playlist = gon.playlist || [];

    $scope.comments = gon.comments || {};

    $scope.comment = {};


    $scope.allSongs = function(){
      return $scope.songs;
    };

    $scope.isActiveSong = function(song){
      return song.id == $scope.song.id;
    };

    $scope.addSong = function(song){
      console.log('Add Song', song);

      $http.post('q.json', {song_id: song.id }).success(function(data){
        $scope.playlist = data;
        //increment count
      });
    };

    $scope.pauseSong = function(){
      document.getElementById('music').pause();
      $('#controls .pause').addClass('inactive');
      $('#controls .play').removeClass('inactive');
      
    }

    $scope.playSong = function(song){
      $scope.song = song;
      var filename = gon.music_host + song.filename;
      $('#music').attr('src', filename);
      
      $('#controls .pause').removeClass('inactive');
      $('#controls .play').addClass('inactive');


      document.getElementById('music').play();

        $(document).title = 'thistrack.rocks'

        if (navigator.geolocation) {            
            //navigator.geolocation.getCurrentPosition(logPlay);
        }
    };

    $scope.clearPlaylist = function(){
      $scope.playlist = [];
    }


    $scope.addComment = function(){
      $http.post('comments.json', { 'comment': $scope.comment})
        .success(function(data){
          $scope.comment = {};
          //display success message
        }).error(function(){});
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