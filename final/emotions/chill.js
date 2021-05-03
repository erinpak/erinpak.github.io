// Assign all html elements to variables
let now_playing = document.querySelector(".now-playing");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let duration_slider = document.querySelector(".duration_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create audio element for msuic player
let curr_track = document.createElement('audio');

// List music tracks
let track_list = [
    {
        name: "example song",
        artist: "singer",
        path: ("https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3")
    },
    {
        name: "Song",
        artist: "Singer",
        path: ("song")
    },
    {
        name: "Song",
        artist: "Singer",
        path: "song.mp3"
    },
];


// Loading tracks
function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues(); // To clear the previous duration timer

    curr_track.src = track_list[track_index].path;
    curr_track.load();

    //Update details
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;

    // Update duration slider by 1000 miliseconds
    updateTimer = setInterval(durationUpdate, 1000);

    // Adding next track event listener
    curr_track.addEventListener("ended", nextTrack);

    // Reset all values to default
    function resetValues() {
        curr_time.textContent = "00:00";
        total_duration.textContent = "00:00";
        duration_slider.value = 0;
    }

}



// PLAYER BUTTONS!!
function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    // Icon from play to pause
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    // Icon from pause to play
    playpause_btn.innerHTML = '<i class=fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
    // Restart track list if it's at the end
    if (track_index < track_list.length - 1)
        track_index += 1;
    else track_index = 0;
    // Play next track
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    // Restart to last track if it's at the beginning
    if (track_index > 0)
        track_index -= 1;
    else track_index = track_list.length;
    // Play next track
    loadTrack(track_index);
    playTrack();
}

function durationTo() {
    let durationTo = curr_track.duration * (duration_slider.value / 100);
    curr_track.currentTime = durationTo;
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

function durationUpdate() {
    let durationPosition = 0;

    // Check if track duration is a readible number
    if (!isNaN(curr_track.duration)) {
        durationPosition = curr_track.currentTime * (100 / curr_track.duration);
        duration_slider.value = durationPosition;

        // Calculate time left and total duration
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        // Add zero to single digit time values
        if (currentSeconds < 10) {
            currentSeconds = "0" + currentSeconds;
        }
        if (durationSeconds < 10) {
            durationSeconds = "0" + durationSeconds;
        }
        if (currentMinutes < 10) {
            currentMinutes = "0" + currentMinutes;
        }
        if (durationMinutes < 10) {
            durationMinutes = "0" + durationMinutes;
        }

        // Display updaated duration
        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    
    }

}



// Load first track in the list!!
loadTrack(track_index);