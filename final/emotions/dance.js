const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')

const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')


// Song titles array
const songs = [
    'Divinity', 
    'GUD VIBRATIONS', 
    'Dandelion', 
    'Trampoline',
    'Gold (Stupid Love)', 
    'UCLA',
    'Dont Stop',
    'Better Not',
    'Shelter'
]

// Keep track of songs
let songIndex = 0

// Initially load song into DOM
loadSong(songs[songIndex])

// Update song details
function loadSong(song) {
    title.innerText = song
    audio.src = `music/${song}.mp3` // songs must be mp3 format, backticks used for $ scripts
    cover.src = `images/${song}.jpg` // song names + image names must be same for {song}
}

// Buttons: play, pause, prev, next
function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play') // Changing btns
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    audio.play() // Play audio
}

function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play') // Changing btns
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    audio.pause() // Pause audio
}

function prevSong() {
    songIndex --

    if(songIndex < 0) {
        songIndex = songs.length - 1 // loop to last song
    }

    loadSong(songs[songIndex])
    playSong()
}

function nextSong() {
    songIndex ++

    if(songIndex > songs.length - 1) { // reset to first song
        songIndex = 0
    }

    loadSong(songs[songIndex])
    playSong()
}

function updateProgress(e) { // progress bar movement, e = event object
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

function setProgress(e) { // seeking to any point on progress bar
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration
    // set currentTime of song to wherever you clickX
    audio.currentTime = (clickX / width) * duration
}

function durTime(e) { 
// For the math below I followed this tutorial: 
// https://github.com/bradtraversy/vanillawebprojects/blob/master/music-player/script.js
    const {duration, currentTime} = e.srcElement
    var sec
    var sec_d

    // Define minutes and seconds currentTime 
    let min = (currentTime == null)? 0:
        Math.floor(currentTime / 60)
    min = min < 10 ? '0' +min:min

    function get_sec(x) {
        if (Math.floor(x) >= 60) {
            for (var i = 1; i <= 60; i++) {
                if (Math.floor(x) >= (60*i) && Math.floor(x)<(60*(i+1))) {
                    sec = Math.floor(x) - (60*i)
                    sec = sec <10 ? '0'+sec:sec
                }
            }
        } else {
            sec = Math.floor(x)
            sec = sec < 10 ? '0' + sec:sec
        }
    }

    get_sec(currentTime, sec)

    // change currentTime DOM
    currTime.innerHTML = min + ':' + sec;

    // Define minutes and seconds duration
    let min_d = (isNaN(duration) === true)? '0':
        Math.floor(duration / 60)
    min_d = min_d < 10 ? '0' + min_d:min_d

    function get_sec_d (x) {
        if(Math.floor(x) >= 60) {
            for (var i = 1; i <= 60; i++) {
                if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60*(i+1))) {
                    sec_d = Math.floor(x) - (60*i)
                    sec_d = sec_d < 10 ? '0' + sec_d:sec_d
                }
            }
        } else {
            sec_d = (isNaN(duration) === true)? '0':
                Math.floor(x)
             sec_d = sec_d < 10 ? '0' + sec_d:sec_d
        }
    }

    get_sec_d(duration)

    // change duration DOM
    durTime.innerHTML = min_d + ':' + sec_d
}

// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')
    if(isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

prevBtn.addEventListener('click', prevSong)

nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress) // timeupdate = constantly be called

progressContainer.addEventListener('click', setProgress) // seek to any part of the song on progress bar

audio.addEventListener('ended', nextSong) // autoplay next song





// MOUSE CURSOR ANIMATION
var dots = [], mouse = {
     x: 0,
     y: 0
};

// Line up the dots
var Dot = function() {
    this.x = 0;
    this.y = 100;
    this.node = (function(){
        var n = document.createElement("div");
        n.className = "trail";
        document.body.appendChild(n);
        return n;
    }());
};

Dot.prototype.draw = function() {
    this.node.style.left = this.x + "px";
    this.node.style.top = this.y + "px";
};

// Populate dot array
for (var i = 0; i < 30; i++) {
    var d = new Dot();
    dots.push(d);
}

// Screen redraw
function draw() {
    var x = mouse.x,
    y = mouse.y;
 
 // Movement
    dots.forEach(function(dot, index, dots) {
        var nextDot = dots[index + 1] || dots[0];
        dot.x = x;
        dot.y = y;
        dot.draw();
        x += (nextDot.x - dot.x) * .6;
        y += (nextDot.y - dot.y) * .6;
    });
}

addEventListener("mousemove", function(event) {
    // event.preventDefault();
    mouse.x = event.pageX;
    mouse.y = event.pageY;
});

function animate() {
    draw();
    requestAnimationFrame(animate);
}

animate();


// SIDEBAR NAVI
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("naviButton").style.marginLeft = "250px";
}
  
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("naviButton").style.marginLeft= "0";
}

closeNav();