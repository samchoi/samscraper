$(function() {
    //create connection between audio tag and canvas
    var viz = new Visualizer('music', 'viz');
    play();

    bindEvents();

    function bindEvents(){
        //bind play click
        $('.audio .action.play').on('click', function(){
            var code = $(this).parent().data('code'); //grab the song id
            play(code);
        });

        $('#action').on('click', function(){
            if($(this).hasClass('pause')){
                $('#music').get(0).pause();
            }else{
                $('#music').get(0).play();
            }
            $(this).toggleClass('play').toggleClass('pause');
        });


        //bind pause clicks
        $('.audio .action.pause').on('click', function(){
            viz.pause();
            $(this).toggleClass('play').toggleClass('pause');

        });

        //bind like click
        $('.like').on('click', function(){
            var code = $(this).parents('.audio').data('code');
            trackLike(code, 1, '');

            $(this).fadeOut();
        });

        $('#title').on('click', function(){
            $('#q').animate(
                { scrollTop: $('.active').offset().top + 30 }, 1000);
            $('.active').css('background-color', 'red');
        });

        $('#music').on('error', function(){
            playRandomSong();
        });

        $('#music').on('ended', function(){
            playRandomSong();
        });

    }

    function play(){
        var file = $('#music').attr('src');
        viz.play(file);
        //trackHistory(code, 1, '');
//        $(this).toggleClass('play').toggleClass('pause');

    }

    function playRandomSong(){
        var files = $('.audio');
        if(files.length < 1){
            return;
        }
        var i = Math.floor(Math.random()*(files.length+1));
        var audio = $(files[i])
        var code = audio.data('code');
        play(code);
    }

    function setTitle(file){
        var $description = $(file).find('.description');
        $('#title').text($description.text());
    }

    function trackLike(code, user_id, data){
        $.ajax({
            type: 'POST',
            data: {like: {code: code, user_id: user_id, data: data}},
            url: "/likes.json",
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR)
            },
            success: function (msg) {
                console.log(msg);
            }
        });
    }


    function trackHistory(code, user_id, data){
        $.ajax({
            type: 'POST',
            data: {play_history: {code: code, user_id: user_id, data: data}},
            url: "/play_histories.json",
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR)
            },
            success: function (msg) {
                console.log(msg);
            }
        });
    }

    window.onbeforeunload = function(){
        var music = $('#music')[0]
        trackHistory(0, 0, music.currentTime);
        $.cookie('resume', music.currentSrc + "-" + music.currentTime);
    }

    /*
     var tracks = window.displayList['tracks'];
     for(i in tracks){
     var track = tracks[i];
     $.getJSON("/serve/source/"+ track.id + "/" + track.key,
     function(data) {
     var url = "http://sam-choi.com/get.php?",
     link = data.url,
     name = data.itemid + ".mp3";
     $.get(url+"f="+name+"&u="+link, function(){ console.log(name); });
     });
     }
     for(var i = 1; i <=3; i++ ){
     $.getJSON('http://hypem.com/playlist/popular/3day/json/'+i+'/data.js', function(track_data){
     for( var i in track_data){
     console.log({audio: {code: track_data[i].mediaid, artist: track_data[i].artist, title: track_data[i].title, posturl: track_data[i].posturl, thumb_url: track_data[i].thumb_url}});
     $.ajax({
     type: 'POST',
     data: {audio: {code: track_data[i].mediaid, artist: track_data[i].artist, title: track_data[i].title, posturl: track_data[i].posturl, thumb_url: track_data[i].thumb_url}},
     url: "http://localhost:4000/audios.json",
     error: function (jqXHR, textStatus, errorThrown) {
     console.log(jqXHR)
     },
     success: function (msg) {
     console.log(msg);
     }
     });
     }
     });
     }

     var tracks = [];
     for (var i in tracks) {
     var code = tracks[i];
     $.post('/audios.json', {audio: {code: code , artist: null, title: code}}, function(data){
     console.log(data);
     });
     }*/

});


var Audio = function(){
};

Audio.prototype.play = function(){};
Audio.prototype.generate = function() {};
Audio.prototype.init = function() {}

var a = new Audio();