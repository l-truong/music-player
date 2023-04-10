
// Music
const songs = [    
    {
        name: 'ficx-your-heart-BLACKBOX',
        imglink: 'https://unsplash.com/fr/photos/aGLyMVEyqnI',
        displayName: 'Ficx Your Heart',
        artist: 'BLACKBOX',
        musiclink: 'https://pixabay.com/music/dance-black-box-ficx-your-heart-129460/'
    },
    {
        name: 'are-you-with-me-22941069',
        imglink: 'https://unsplash.com/fr/photos/b2CHaap-90A',
        displayName: 'Are You With Me?',
        artist: '22941069',
        musiclink: 'https://pixabay.com/music/indie-pop-are-you-with-me-poprock-12536/'
    },
    {
        name: 'comfortable-shiyahgirl',
        imglink: 'https://unsplash.com/fr/photos/Usew0T9p_Dk',
        displayName: 'Comfortable', 
        artist: 'shiyahgirl',
        musiclink: 'https://pixabay.com/music/alternative-hip-hop-comfortable-140394/'
    },
    {
        name: 'i-will-be-here-FASSounds',
        imglink: 'https://unsplash.com/fr/photos/VIZ2R40SSfA',
        displayName: 'I Will Be Here (Vocal EDM)',
        artist: 'FASSounds',
        musiclink: 'https://pixabay.com/music/pop-i-will-be-here-vocal-edm-140857/'
    }, 
    {
        name: 'fighter-22941069',
        imglink: 'https://unsplash.com/fr/photos/DZCQM01v1cM',
        displayName: 'Fighter', 
        artist: '22941069',
        musiclink: 'https://pixabay.com/music/indie-pop-fighter-punk-rock-10263/'
    }
]

// Const
const imagelink = document.getElementById('imagelink');
const image = document.querySelector('img');
const musiclink = document.getElementById('musiclink');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('Pause', 'title');
    music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
    imagelink.href = song.imglink;
    title.textContent = song.displayName;
    musiclink.href = song.musiclink;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`
    image.src = `img/${song.name}.jpg`
}

// Curent Song
let songIndex = 0;

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Prev Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime} = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime/duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration/60);        
        let durationSecondes = Math.floor(duration%60);
        if (durationSecondes < 10) {
            durationSecondes = `0${durationSecondes}`;
        }
        // Delay switching duration Element to avoir NaN
        if (durationSecondes) {
            durationEl.textContent = `${durationMinutes}:${durationSecondes}`;
        }

        // Calculate display for current
        const currentMinutes = Math.floor(currentTime/60);        
        let currentSecondes = Math.floor(currentTime%60);
        if (currentSecondes < 10) {
            currentSecondes = `0${currentSecondes}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSecondes}`;
    }
}

// Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX/width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);