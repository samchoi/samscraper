$(function() {
    play();

});

    function play(){
    var file = $('#music').attr('src');
    viz.play(file);
    //trackHistory(code, 1, '');
//        $(this).toggleClass('play').toggleClass('pause');

}
