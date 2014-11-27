/*
    downloads files via webserver call

    phantomjs hello.js 1
    phantomjs hello.js 2
    phantomjs hello.js 3
    rake:load_hm
    rake:index
 */


console.log('Scraping Results');
var system = require('system');
var page1 = require('webpage').create();
var url = 'http://localhost:3000/movies';

scrape(page1);


function scrape(page){

    console.log('Scraping ' + url)

    page.onConsoleMessage = function(msg) {
        console.log(msg);
    };


    page.open(url, function() {
        var args = system.args
        var counter = 0;
        var result = page.evaluate(function() {
            //BEGIN CODE
            var items = $.map($('.klitem'), function(n, i){ 
                var element = $(n);
                return {
                  name: element.attr('title'),
                  image_source: element.find('img').attr('src')
                } 
              });

              for (var i in items) {
                $.post('/movies.json', {movie: items[i]}, function(data){
                    counter += 1;
                })
              }
            //END CODE

        });

        console.log(result);
/*        setInterval(function(){ 
            if(counter == items.length){
                phantom.exit();                 
            }
        }, 1000);*/
    });
}
