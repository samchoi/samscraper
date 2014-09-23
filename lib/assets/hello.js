/*
    downloads files via webserver call
 */

console.log('Scraping Hypemachine');
var page = require('webpage').create();
var dl = require('webpage').create();
var url = 'http://hypem.com/samchoi/history';
page.onConsoleMessage = function(msg) {
    console.log(msg);
};

page.open(url, function() {
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