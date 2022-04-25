const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const play = document.getElementById("play");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeElement = document.getElementById("current-time");
const durationElement = document.getElementById("duration");

// Music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill",
    artist: "Rammstein",
  },
  {
    name: "jacinto-2",
    displayName: "Electric 2",
    artist: "Link P",
  },
  {
    name: "jacinto-3",
    displayName: "Electric 3",
    artist: "Abba",
  },
  {
    name: "metric-1",
    displayName: "Ehuuu 4",
    artist: "Ehuuu",
  },
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  changeActionButton("fa-play", "fa-pause", "Pause");
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  changeActionButton("fa-pause", "fa-play", "Play");

  music.pause();
}

// Change action button
function changeActionButton(dir1, dir2, title) {
  play.classList.replace(dir1, dir2);
  play.title = title;
}

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

let songIndex = 0;

function nextSong() {
  songIndex++;
  if (songIndex === songs.length) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On load - select first song
loadSong(songs[songIndex]);

// Event listeners
play.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
prev.addEventListener("click", prevSong);
next.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
music.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgressBar);

// Update progress bar
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    if (durationSeconds) {
      durationElement.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    if (currentSeconds) {
      currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`;
    }
  }
}

// Set progress bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}
