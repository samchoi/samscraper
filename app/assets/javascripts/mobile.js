$(function() {
    var player = new function() {
        this.music = document.getElementById('music');

        this.play = function(){
            this.music.play(this.music.src);
        }

        this.pause = function(){
            this.music.pause();
        }

    }

    var random = Math.floor(Math.random() * 4) + 1;

    $('body').css( 'background-image', 'url("/assets/wallpaper'+ random  +'.jpg")');

    $(window).on('orientationchange', function(){
        $('#content').css('height', '100vh');
        $('#content').css('width', '100vw');
    }).on('resize', function(){
        $('#content').css('height', '100vh');
        $('#content').css('width', '100vw');
    });

    $('#title').on('click', function(){
        var _self = $(this);

        if(_self.hasClass('paused')){
            _self.removeClass('paused');
            player.music.play(_self.data('filename'))
        }else{
            _self.addClass('paused');
            player.pause();
        }
    });

    $('.song').on('click', function (){
        var _self = $(this);

        if(!_self.hasClass('active')){
            $('.remove').removeClass('active');
            _self.addClass('active');
            $('#title').html(_self.data('name'))
            $('#music').attr('src', '/music/top50/'+_self.data('filename'));
        }

        if(_self.hasClass('paused')){
            _self.removeClass('paused');
            player.music.play(_self.data('filename'))
        }else{
            _self.addClass('paused');
            player.pause();
        }

//        $(this).siblings('.play').toggleClass('inactive');
    });

    player.play();




});
