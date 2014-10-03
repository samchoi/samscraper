function Visualizer(domId, viz){
    this.analyzer = null;
    this.freqData = null;
    this.audio = document.getElementById(domId);
    this.context = new webkitAudioContext();
    this.lastFreq = null;
    this.analyser = this.context.createAnalyser();
    this.source = this.context.createMediaElementSource(this.audio);
    this.gainNode = this.context.createGain();
    this.source.connect(this.analyser);
    this.source.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
    this.analyser.connect(this.context.destination);
    this.play();
    this.loop(0, viz); //starts visualizer
}

Visualizer.prototype.play = function(file){
    this.audio.play();
    this.gainNode.gain.linearRampToValueAtTime(1, 0);
    this.gainNode.gain.linearRampToValueAtTime(0, 1);;
 
};

Visualizer.prototype.pause = function(){
    this.audio.pause();
}

Visualizer.prototype.change = function(e){
    if (e.target.className == 'music'){
	player.play(e.target.dataset.music);
    }
    return false;
};

Visualizer.prototype.loop = function(x, id){
    self = this;
    delta = 0;
    
    fbc_array = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(fbc_array);
    canvas = document.getElementById(id);
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    bars = this.analyser.frequencyBinCount;
    ctx.fillStyle = 'grey';//this.randomColor(); // Color of the bars
    ctx.strokeStyle = '#09E5D0';
    bar = $('input[name=visual-option]:checked').val() == 'bar'
    for (var i = 0; i < bars; i++) {
        //ctx.fillStyle = getColor(i);
        bar_x = i*3;
        bar_width = 2;
        bar_height = -(fbc_array[i] / 2);
        //ctx.fillRect(bar_x, bar_height, bar_width, canvas.height-5);
        //bars
        if(bar){
            factor = fbc_array[i];
            ctx.fillRect(bar_x, 0, bar_width, fbc_array[i]);
        }else{
            factor = .3;
            //line
            if(fbc_array[i+1]){
                ctx.beginPath()
                ctx.moveTo(bar_x, Math.max(fbc_array[i] * factor, 10));
                ctx.lineTo(bar_x+3, Math.max(fbc_array[i+1] * factor, 10));
                ctx.stroke();
            }
        }
    }
    window.requestAnimationFrame(function(inc){ self.loop(delta, id); });
}

Visualizer.prototype.randomColor =function () {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
    var colors = ['#09E5D0', '#03403A', '#0AFFE7', '#057F74', '#08BFAD']

    return colors[Math.round(Math.random() * 5)];
}

function RGB2Color(r,g,b)
{
    return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function byte2Hex(n)
{
    var nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}




function getColor(i){
    var frequency1 = .3, frequency2 = .3, frequency3 = .3,
        phase1 = 0, phase2 = 2, phase3 = 4, len = 50, center = 128, width = 127;

    var red = Math.sin(frequency1*i + phase1) * width + center;
    var grn = Math.sin(frequency2*i + phase2) * width + center;
    var blu = Math.sin(frequency3*i + phase3) * width + center;

    return RGB2Color(red,grn,blu);
}
