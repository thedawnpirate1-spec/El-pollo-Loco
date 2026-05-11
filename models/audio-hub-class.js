/**
 * Class representing the audio management system for the game.
 */
class AudioHub{
    volume = 1;
    isMuted = false;
    audioCache = {};

    /**
     * Creates an instance of AudioHub.
     * @constructor
     */
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

    /**
     * Toggles the global mute state and updates the UI mute icon.
     */
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

    /**
     * Pauses all currently playing sounds.
     */
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
        if (!audio) {
            console.error("Audio not preloaded:", path);
            return;
        }
        
        let isLoop = this.isLoopingSound(path);
        if (isLoop) audio.loop = true;

        if (audio.readyState >= 2) {
            this.playReadySound(audio, isLoop);
        } else {
            this.playWhenReady(audio, isLoop);
        }
    }

    /**
     * Checks if a specific sound should loop continuously.
     * @param {string} path - The path to the audio file.
     * @returns {boolean} True if the sound is a looping sound, false otherwise.
     */
    isLoopingSound(path) {
        return ['img/sounds/endboss/endbossApproach.wav', 'img/sounds/character/characterRun.mp3', 'img/sounds/character/characterSnoring.mp3'].includes(path);
    }

    /**
     * Plays a sound that is already loaded and ready.
     * @param {HTMLAudioElement} audio - The audio element to play.
     * @param {boolean} isLoop - Indicates whether the sound should loop.
     */
    playReadySound(audio, isLoop) {
        if (!isLoop) {
            this.playClonedSound(audio);
        } else {
            if (!audio.paused) return; // Don't replay if already playing
            this.playAudioInstance(audio);
        }
    }

    /**
     * Adds an event listener to play the sound once it is ready.
     * @param {HTMLAudioElement} audio - The audio element.
     * @param {boolean} isLoop - Indicates whether the sound should loop.
     */
    playWhenReady(audio, isLoop) {
        audio.addEventListener('canplay', () => {
            if (this.isMuted) return;
            if (!isLoop) {
                this.playClonedSound(audio);
            } else {
                this.playAudioInstance(audio);
            }
        }, { once: true });
    }

    /**
     * Clones the audio node and plays it to allow overlapping sounds.
     * @param {HTMLAudioElement} audio - The audio element to clone.
     */
    playClonedSound(audio) {
        let sfx = audio.cloneNode();
        sfx.volume = this.volume;
        this.executePlayPromise(sfx.play());
    }

    /**
     * Plays the base instance of the audio element.
     * @param {HTMLAudioElement} audio - The audio element.
     */
    playAudioInstance(audio) {
        audio.volume = this.volume;
        this.executePlayPromise(audio.play());
    }

    /**
     * Safely executes an audio play promise and catches abort errors.
     * @param {Promise} playPromise - The promise returned by audio.play().
     */
    executePlayPromise(playPromise) {
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                if (error.name !== 'AbortError') console.warn("Audio playback prevented:", error);
            });
        }
    }

    /**
     * Pauses a specific sound effect.
     * @param {string} path - The path to the audio file.
     */
    pauseSound(path) {
        let audio = this.audioCache[path];
        if (audio) {
            audio.pause();
        }
    }
}
