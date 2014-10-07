$(function(){
    $('#hack').on('mouseover', function(){
        $('.slide-left').addClass('slide');
    }).on('mouseout', function(){
        $('.slide-left').removeClass('slide');
    });


    function isPassedHeader(elem)
    {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }
    var sections = ['local', 'hack', 'ucsb', 'summer', 'winter', 'travel'];
    var $h2 = $('#header h2');

    var active = 0, next = 1;

    var lastScrollTop = 0;
    $(window).on('scroll', function(e){
        var st = $(this).scrollTop();
        var $active = $('#'+sections[active] + ' p');
        if(!$active.length){
            return;
        }

        if (st > lastScrollTop){
            if($active.position().top < $(window).scrollTop()+$h2.position().top){
                if(active < 0){
                    active = 0;
                }else if(active >= sections.length-1){
                    active = sections.length-2;
                }

                $h2.html($active.html());
                active += 1
                console.log('down', active);
                $active = $('#'+sections[active] + ' p');
                console.log($active);
            }

        } else {
            if($active.position().top > $(window).scrollTop()+$h2.position().top){
                if(active <= 0){
                    active = 1;
                }else if(active > sections.length-1){
                    active = sections.length-2;
                    active = sections.length-2;
                }


                active -= 1;
                console.log('up', active);
                $active = $('#'+sections[active]+' p');
                console.log($active);
                $h2.html($active.html());

            }

        }
        lastScrollTop = st;

    });
});