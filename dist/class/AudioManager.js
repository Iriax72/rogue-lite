import { assertDefined } from "../usefull/functions.js";
export class AudioManager {
    audioMap;
    bgMusic = null;
    audios = {};
    bgVolume = 0.3;
    soundEffectVolume = 0.7;
    isMuted = false;
    hasUserInteracted = false;
    selectedBgMusicName = null;
    TILE_SIZE = 32;
    constructor(audioMap) {
        this.audioMap = audioMap;
        this.loadSoundEffect('throw-arrow', '../assets/audio/arrow.mp3');
        this.loadSoundEffect('throw-fire-ball', '../assets/audio/fire-ball.mp3');
        this.loadSoundEffect('bg-music-0', '../assets/audio/bg-music-0.mp3');
        this.loadSoundEffect('bg-music-1', '../assets/audio/bg-music-1.mp3');
    }
    update(playerRect) {
        const playerCenter = {
            x: playerRect.x + playerRect.w / 2,
            y: playerRect.y + playerRect.h / 2
        };
        const playerTile = {
            x: Math.floor(playerCenter.x / this.TILE_SIZE),
            y: Math.floor(playerCenter.y / this.TILE_SIZE)
        };
        const audioLine = this.audioMap[playerTile.y];
        assertDefined(audioLine, "La ligne n'est pas présente dans audioMap");
        const musicName = 'bg-music-' + audioLine[playerTile.x];
        this.selectedBgMusicName = musicName;
        this.playBgMusic(musicName);
    }
    onUserInteraction() {
        if (this.hasUserInteracted)
            return;
        this.hasUserInteracted = true;
        if (this.selectedBgMusicName) {
            this.playBgMusic(this.selectedBgMusicName);
        }
    }
    playBgMusic(name) {
        if (!this.hasUserInteracted
            ||
                this.isMuted
            || !this.audios[name]
            || this.audios[name] === this.bgMusic)
            return;
        this.bgMusic?.pause();
        this.bgMusic = this.audios[name];
        this.bgMusic.volume = this.bgVolume;
        this.bgMusic.loop = true;
        this.bgMusic.play().catch(() => { });
    }
    playSoundEffect(name) {
        if (this.isMuted || !this.audios[name])
            return;
        const clone = this.audios[name].cloneNode();
        clone.volume = this.soundEffectVolume;
        clone.play().catch(() => { });
    }
    toggleMute() {
        this.isMuted = !this.isMuted;
        return this.isMuted;
    }
    loadSoundEffect(name, src) {
        const audio = new Audio(src);
        audio.volume = this.soundEffectVolume;
        this.audios[name] = audio;
    }
}
