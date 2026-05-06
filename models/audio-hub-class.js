class AudioHub{
    volume = 1;
    isMuted = false;
    audioCache = {};

    constructor(){}

    /**
     * Loads all audio files in the cache.
     * @param {Array<string>} arr - Array of audio file paths.
     */
    loadSounds(arr) {
        arr.forEach((path) => {
            let audio = new Audio(path);
            this.audioCache[path] = audio;
        });
    }

    
    toggleMute() {
        this.isMuted = !this.isMuted;
        const muteIcon = document.getElementById('muteIcon');
        
        if (muteIcon) {
            if (this.isMuted) {
                muteIcon.src = 'img/button icons/volume-x-svgrepo-com.svg';
                this.pauseAllSounds();
            } else {
                muteIcon.src = 'img/button icons/volume-high-svgrepo-com.svg';
            }
        }
    }

    pauseAllSounds() {
        Object.values(this.audioCache).forEach(audio => {
            audio.pause();
        });
    }

    /**
     * Plays a sound effect.
     * @param {string} path - Path to audio file.
     */
    playSound(path) {
        if (this.isMuted) return;
        
        let audio = this.audioCache[path];
        if (audio) {
            audio.currentTime = 0; // Reset to start for quick replays
            audio.volume = this.volume;
            audio.play();
        } else {
            console.error("Audio not preloaded:", path);
        }
    }

    pauseSound(path) {
        let audio = this.audioCache[path];
        if (audio) {
            audio.pause();
        }
    }
}