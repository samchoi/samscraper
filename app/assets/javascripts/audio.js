$(function() {
    //create connection between audio tag and canvas
    var viz = new Visualizer('music', 'viz');
    var lastScrollTop = 0;
    var progressInterval;
    play();

    bindEvents();

    function bindEvents(){
        /*
        $(document).on('scroll', function(){
            var st = $(this).scrollTop();
            var top = parseInt($('#fixed-top').css('background-position-y'), 10);
            var factor = st > lastScrollTop ? -10 : 10
            lastScrollTop = st;
            $('#fixed-top').css('background-position-y', top+factor);
        });
        */
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


        $('.actions').on('click', '.play', function(){
            viz.play();
            $(this).toggleClass('inactive');
            $(this).siblings('.pause').toggleClass('inactive');

        }).on('click', '.pause', function(){
            viz.pause();
            $(this).toggleClass('inactive');
            $(this).siblings('.play').toggleClass('inactive');

        });



        $('#songs').on('mouseover', 'li', function(){
            $(this).addClass('hover');
            //$(this).find('.action-name').html('Play');
        }).on('mouseout', 'li', function(){
            $(this).removeClass('hover');
            //$(this).find('.action-name').html('');
        }).on('mouseover', '.download-btn', function(){
            //$(this).parents('.bottom').siblings('.action-name').html('Download');
        });

        $('.bottom').on('mouseover', '.name', function(){
            $(this).parent().siblings('.action-name').html('Play');
        }).on('mouseout', '.name', function(){
            $(this).parent().siblings('.action-name').html('');
        });;

        $('.actions').on('mouseover', '.play-btn', function(){
           $(this).parents('.bottom').siblings('.action-name').html('Play');
        }).on('mouseover', '.pause-btn', function(){
           $(this).parents('.bottom').siblings('.action-name').html('Pause');
        }).on('mouseover', '.download-btn', function(){
           $(this).parents('.bottom').siblings('.action-name').html('Save');
        }).on('mouseover', '.add', function(){
            $(this).parents('.bottom').siblings('.action-name').html('Add');
        }).on('mouseout', function(){
            $(this).parents('.bottom').siblings('.action-name').html('');
        });

        //bind pause clicks
        $('.audio .action.pause').on('click', function(){
            viz.pause();
            $(this).toggleClass('play').toggleClass('pause');

        });

        //bind like click
        $('.add').on('click', function(){
            var _self = $(this);
            $.post('/q.json',{song_id: _self.data('id') }, function(data){
              var json = $.parseJSON(data)
              $('#playlist').replaceWith(json.html);
              $('#playlist-count').html($('#playlist li').length-1);
              $('#playlist').removeClass('inactive');
              setTimeout(function(){ $('#playlist').addClass('inactive'); }, 2500);
            });
        });

        $('.minus').on('click', function(){
            var _self = $(this);
            $.post('/remove.json',{song_id: _self.parent().data('song-id') }, function(data){
            });

            _self.parent().slideUp().remove();
        });

        $('#playlist-count').on('mouseover', function(){
           $(this).siblings('#playlist').removeClass('inactive');
        }).on('mouseout', function(){
            setTimeout(function(){ $('#playlist').addClass('inactive'); }, 2500);
        });

        $(document).on('click', '#playlist a.play-song', function(e){
            var _self = $(this);
            var file =  _self.data('filename');
            e.preventDefault();
            //set src
            $('#music').attr('src', gon.music_host + file);
            $('#controls span.name').html(_self.data('name'));
            //start player
            play();
        });

        $(document).on('click', '.play-btn', function(e){
            e.preventDefault();

            queueSong($(this).parents('li'));
            play();
        });

        $(document).on('keyup', '#playlist-name', function(){
            $('#download-btn').attr('href', '/dl/'+$(this).val());
        });

        $('#music').on('error', function(){
            newSong();
        }).on('play', function(){
            progressInterval = setInterval(progress, 100);
        }).on('ended', function(){
            newSong();
        });

    }

    function play(){
        var file = $('#music').attr('src');
        viz.play(file);


        $(document).title = 'thistrack.rocks'

        if (navigator.geolocation) {            
            navigator.geolocation.getCurrentPosition(logPlay);
        }

    }

    function logPlay(position) {
        var music = $('.active');
        var post_data = {
            play: {
                song_id: music.data('id'),
                user_id: 1,
                lat: position.coords.latitude,
                long: position.coords.longitude
            }
        }

        $.post('/plays.json', post_data, function(){
            //success action for GPS logging
        });

    }

    function queueSong(_self){
        var $holder = _self;
        var file =  $holder.data('filename');
        var name =  $holder.data('name');
        var id =  $holder.data('id');
        var description =  $holder.find('.description').html();
        _self.addClass('active')
        //set src
        $('#music').attr('src', gon.music_host + file);
        $('#controls span.name').html(name);
        $('#ticker').html(description);
        $('#controls .btn.add').data('id', id);
        //start player
        $('#action').toggleClass('play');

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


    //setting page refresh restart
    window.onbeforeunload = function(){
        var music = document.getElementsById('music')
        $.cookie('resume', music.currentTime);
    }

    function progress(){
        var width = document.getElementById('fixed-top').offsetWidth;
        var music = document.getElementById('music');

        var progress = Math.round(music.currentTime/music.duration * width);

        document.getElementById('progress').style.width = progress +'px'
    }

    function resetProgressBar(){
        document.getElementById('progress').style.width = '0px'
        clearInterval(progressInterval);
    }

    function getNextSong(){
        //remove tile
        $('.active').remove();

        //find next song
        var songs = $('#songs li');
        if(songs.length < 1){
            return;
        }
        var i = Math.floor(Math.random()*(songs.length+1));
        return $(songs[i])
    }

    function newSong(){
        resetProgressBar();
        queueSong(getNextSong());
        play();
    }
});

