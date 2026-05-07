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
            let isLoop = ['img/sounds/game/gameStart.mp3', 'img/sounds/endboss/endbossApproach.wav', 'img/sounds/character/characterRun.mp3', 'img/sounds/character/characterSnoring.mp3'].includes(path);
            if (isLoop) {
                audio.loop = true;
            }

            if (audio.readyState >= 2) {
                if (!isLoop) {
                    audio.currentTime = 0;
                } else {
                    if (!audio.paused) return; // Don't replay if already playing
                }
                audio.volume = this.volume;
                let playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        if (error.name !== 'AbortError') console.warn("Audio playback prevented:", error);
                    });
                }
            } else {
                audio.addEventListener('canplay', () => {
                    if (!this.isMuted) {
                        if (!isLoop) audio.currentTime = 0;
                        audio.volume = this.volume;
                        let playPromise = audio.play();
                        if (playPromise !== undefined) {
                            playPromise.catch(e => {
                                if (e.name !== 'AbortError') console.warn(e);
                            });
                        }
                    }
                }, { once: true });
            }
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
