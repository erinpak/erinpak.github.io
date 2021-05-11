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
    'a lot',
    'Heartbreak Anniversary', 
    'the remedy for a broken heart', 
    'YEAH RIGHT', 
    'needy',
    'Summer Games',
    'Stuck On You',
    'So It Goes'
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



// RAIN EFFECT
// Tutorial by: https://www.youtube.com/watch?v=hqGNfYrjFZc&ab_channel=Punto%26Virgola 
var c, ctx, vRain;

class Rain { // Creating rain

    constructor(x,y,l,v) { // Length and speed
        this.x=x;
        this.y=y;
        this.vy=v;
        this.l=l;
    }

    show() { // Rain design
        ctx.beginPath();
        ctx.strokeStyle="white";
        ctx.moveTo(this.x,this.y); // 1st droplet
        ctx.lineTo(this.x,this.y + this.l); // last droplet
        ctx.stroke();
    }

    fall() { // Gravity for rain
        this.y += this.vy;

        if(this.y > c.height) { // respawn new droplet once it hits the floor
            this.x = Math.floor(Math.random() * c.width) + 5;
            this.y = Math.floor(Math.random() * 100) - 100; // gives them all different heights
            this.l = Math.floor(Math.random() * 30) + 1;
            this.vy = Math.floor(Math.random() * 12) + 4
        }
    }

}

function loop() { // Loop rain
    ctx.clearRect(0,0,c.width,c.height);
    // rain.show();
    // rain.fall();

    for(var i=0;i<vRain.length;i++) {
        vRain[i].show();
        vRain[i].fall();
    }
}

function setup() { // Setup function, run canvas
    
    c = document.getElementById("canvas");
    ctx = c.getContext("2d");

    // rain = new Rain(10,10,20,6);
    vRain = [];
    for(var i=0;i<60;i++) {
        vRain[i] = new Rain(
            Math.floor(Math.random() * c.width) + 5,
            Math.floor(Math.random() * 100) - 100, // gives them all different heights
            Math.floor(Math.random() * 30) + 1,
            Math.floor(Math.random() * 12) + 4
        );
    }

    setInterval(loop, 10);
}  

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