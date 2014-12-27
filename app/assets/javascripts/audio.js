$(function() {
    //create connection between audio tag and canvas, only need to initialize once
    var viz = new Visualizer('music', 'viz');
    var progressInterval;
    //play();
    document.getElementById('viz').width = Math.min(document.body.clientWidth, 1280) - 5;

    bindEvents();

    function bindEvents(){        
        



        $('#songs').on('mouseover', 'li', function(){
            $(this).addClass('hover');
            //$(this).find('.action-name').html('Play');
        }).on('mouseout', 'li', function(){
            $(this).removeClass('hover');
            //$(this).find('.action-name').html('');
        }).on('mouseover', '.download-btn', function(){
            //$(this).parents('.bottom').siblings('.action-name').html('Download');
        });

        $('.actions').on('mouseover', '.play-btn', function(){
           $(this).siblings('.action-name').html('Play');
        }).on('mouseover', '.pause-btn', function(){
           $(this).siblings('.action-name').html('Pause');
        }).on('mouseover', '.download', function(){
           $(this).siblings('.action-name').html('Download');
        }).on('mouseover', '.add', function(){
            $(this).siblings('.action-name').html('Add');
        }).on('mouseout', function(){
            $(this).find('.action-name').html('');
        });



        $('.minus').on('click', function(){
            var _self = $(this);
            $.post('/remove.json',{song_id: _self.parent().data('song-id') }, function(data){
            });

            _self.parent().slideUp().remove();
        });


        $(document).on('keyup', '#playlist-name', function(){
            $('#download-btn').attr('href', '/dl/'+$(this).val());
        });

        

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
        $('a.download').attr('href', '/ds/' + id)
        //start player
        $('#action').toggleClass('play');

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
        $.cookie('song', music.currentTime);

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
});

