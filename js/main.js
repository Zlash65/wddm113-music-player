const musicPlayerContainer = document.getElementById("music-player-container");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

const progressContainer = document.getElementById("progress-bar-container");
const progressBar = document.getElementById("progress-bar");
const musicTitle = document.getElementById("music-title");

const audio = document.getElementById("audio");
const musicCover = document.getElementById("music-cover");
const currTime = document.getElementById("currentTime");
const durrTime = document.getElementById("durationTime");

// Song titles / names
const songs = [
  ["Back to the Future", "back-to-the-future"],
  ["Headphones", "headphones"],
  ["The Itch", "the-itch"],
  ["DigiFunk", "digifunk"],
  ["Crazy", "crazy"]
];

// Keep track of song
let songIndex = 0;

// load initial song details
loadSong(songs[songIndex]);

// update song details
function loadSong(song) {
  musicTitle.innerText = song[0];
  audio.src = `assets/audio/${song[1]}.mp3`;
  musicCover.src = `assets/images/${song[1]}.jpg`;
}

// update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercent}%`;
}

// set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const position = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (position / width) * duration;
}

// play song
function playSong() {
  musicPlayerContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

// pause song
function pauseSong() {
  musicPlayerContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}

// previous song
function prevSong() {
  songIndex = songIndex - 1;
  (songIndex < 0) && (songIndex = songs.length - 1);

  loadSong(songs[songIndex]);
  playSong();
}

// next song
function nextSong() {
  songIndex = songIndex + 1;
  (songIndex > songs.length - 1) && (songIndex = 0);

  loadSong(songs[songIndex]);
  playSong();
}

//get duration & currentTime for Time of song
function updateDuration (e) {
  const {duration, currentTime} = e.srcElement;
  var sec_curr, sec_durr;

  // define minutes currentTime
  let min = (currentTime==null) ? 0 : Math.floor(currentTime / 60);
  min = (min < 10) ? '0' + min : min;

  // define seconds currentTime
  function get_sec_curr(x) {
    if(Math.floor(x) >= 60) {
      for (var i = 1; i <= 60; i++) {
        if(Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
          sec_curr = Math.floor(x) - (60 * i);
          sec_curr = (sec_curr < 10) ? '0' + sec_curr : sec_curr;
        }
      }
    } else {
      sec_curr = Math.floor(x);
      sec_curr = (sec_curr < 10) ? '0' + sec_curr : sec_curr;
    }
  }

  get_sec_curr(currentTime);
  currTime.innerHTML = min +':'+ sec_curr;

  // define minutes duration
  let min_d = (isNaN(duration) === true) ? '0' : Math.floor(duration / 60);
  min_d = (min_d < 10) ? '0' + min_d : min_d;

  function get_sec_durr (x) {
    if(Math.floor(x) >= 60) {
      for (var i = 1; i <= 60; i++) {
        if(Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
          sec_durr = Math.floor(x) - (60 * i);
          sec_durr = (sec_durr < 10) ? '0' + sec_durr : sec_durr;
        }
      }
    } else {
      sec_durr = (isNaN(duration) === true)? '0' : Math.floor(x);
      sec_durr = (sec_durr < 10) ? '0' + sec_durr : sec_durr;
    }
  }

  get_sec_durr(duration);
  durrTime.innerHTML = min_d +':'+ sec_durr;
};

// play / pause song
playBtn.addEventListener("click", () => {
  const isPlaying = musicPlayerContainer.classList.contains("play");
  (isPlaying) ? pauseSong() : playSong();
});

// change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// progress bar seek to
progressContainer.addEventListener("click", setProgress);

// autoplay next song
audio.addEventListener("ended", nextSong);

// time / song / progress update
audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("timeupdate", updateDuration);
