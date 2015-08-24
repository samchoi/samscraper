(function(){
  
  var app = angular.module('songs', []);

  var musicController = app.controller('MusicController', ['$scope', '$http', function($scope, $http){
    $scope.songs = gon.songs || [];

    $scope.song = gon.song || { id: 0 };

    $scope.playlist = gon.playlist || [];

    $scope.comments = gon.comments || {};

    $scope.comment = {};

    $scope.counter = 0;

    $scope.comment_display = gon.comments[0] || {};

    $scope.activeList = $scope.songs;

    $scope.changeActiveList = function(songList){
      $scope.activeList = songList;
    }

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

      $scope.changeActiveList($scope.playlist);
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

      $scope.changeActiveList($scope.songs);
    };

    $scope.clearPlaylist = function(){
      $scope.playlist = [];
    }

    $scope.togglePlaylist = function(){
      $('#download-list').toggleClass('show');
    }

    $scope.addComment = function(){
      $scope.comment.song_id = $scope.song.id;
      $scope.comment.comment_time = Math.round(document.getElementById('music').currentTime);

      $http.post('/comments.json', { 'comment': $scope.comment})
        .success(function(data){
          $scope.comment = {};
          //display success message
        }).error(function(){});
    };

    $scope.activeComment = function(comment){

    }

    $scope.setupMusicPlayer = function(){

      $('#music').on('error', function(){
        }).on('play', function(){
            progressInterval = setInterval($scope.progress, 100);
        }).on('ended', function(){
            var index = Math.round(Math.random() * $scope.activeList.length);
            //need to reset comments and counter
            $scope.playSong($scope.activeList[index]);
            $scope.$apply();
        });
    };

    $scope.toggleBox = function(selector){
      $('.toggler li.' + selector).toggleClass('active');
      $('#' + selector).toggle();       
    }

    $scope.search = function(){
      var search_term = document.querySelector('#search input').value;
      $http.get('/search/' + search_term)
        .success(function(data){
          $scope.songs = data;
          $scope.$apply();
          //display success message
        }).error(function(){});
    }


    $scope.progress = function(){
      var width = document.getElementById('fixed-top').offsetWidth;
      var music = document.getElementById('music');

      var progress = Math.round(music.currentTime/music.duration * width);

      var currentTime = Math.round(music.currentTime);
      if($scope.comments[$scope.counter] && currentTime == $scope.comments[$scope.counter].comment_time){
        $scope.comment_display = $scope.comments[$scope.counter] || {};
        $scope.counter += 1;
        $scope.$apply();          
      }
      if(progress%10 == 0){
      //    add_comment();     
      }

      document.getElementById('progress').style.width = progress +'px'
    }

    $scope.setupMusicPlayer();

  }]);  
  
  app.directive('songList', function(){
    return {
      restrict: 'E',
      templateUrl: 'song/0/template/song',
      controller: musicController
    };
  });

})();