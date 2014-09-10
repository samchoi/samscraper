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
    this.audio.src = 'http://sam-choi.com/music/' + file;
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
    /*threshold = parseInt(document.getElementById('threshold').value);
    if(x < threshold*-1){
	ctx.fillStyle = this.randomColor(); // Color of the bars
    } */
    bars = this.analyser.frequencyBinCount;
    for (var i = 0; i < bars; i++) {
	bar_x = i * 5;
	bar_width = 3;
	bar_height = -(fbc_array[i] / 2);
	//fillRect( x, y, width, height ) // Explanation of the parameters below
	ctx.fillRect(bar_x, bar_height, bar_width, canvas.height-5);
	ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
	if(this.lastFreq){
	    if(this.lastFreq[i] < fbc_array[i]){
		delta -= 1;
	    }else if(this.lastFreq[i] > fbc_array[i]){
		delta += 1;
	    }
	}
    }
    window.webkitRequestAnimationFrame(function(inc){ self.loop(delta, id); });
    this.lastFreq = fbc_array;
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
