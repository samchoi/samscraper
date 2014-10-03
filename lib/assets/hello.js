/*
    downloads files via webserver call

    phantomjs hello.js 1
    phantomjs hello.js 2
    phantomjs hello.js 3
    rake:load_hm
    rake:index
 */


console.log('Scraping Hypemachine');
var system = require('system');
var page1 = require('webpage').create();
var page2 = require('webpage').create();
var page3 = require('webpage').create();
var url = 'http://hypem.com/popular/';

scrape(system.args[1], page1);
//scrape(2, page2);
//scrape(3, page3);


function scrape(iteration, page){

    var scrape_url = url+ iteration.toString();

    console.log('Scraping ' + scrape_url)

    page.onConsoleMessage = function(msg) {
        console.log(msg);
    };


    page.open(scrape_url, function() {
        var args = system.args
        page.evaluate(function() {
            var tracks = window.displayList['tracks'];
            for(i in tracks){
                var track = tracks[i];
                $.post("/serve/source/"+ track.id + "/" + track.key, function(data) {
                    console.log(data);
                    $.get("http://localhost:3000/s?url="+data.url+"&name="+data.itemid, function(){});
                });
            }

        });
    });
}