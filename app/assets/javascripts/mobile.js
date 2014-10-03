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

    $('#content').css( 'background-image', 'url("/assets/wallpaper'+ random  +'.jpg")');

    $('.song').on('click', function (){

        $(this).toggleClass('paused');

        if($(this).hasClass('paused')){
            $('.song').removeClass('paused');
            player.music.play($(this).data('filename'))
        }else{
            player.pause();
        }

//        $(this).siblings('.play').toggleClass('inactive');
    });

    player.play();




});
