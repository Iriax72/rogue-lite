import { assertDefined } from "../functions.js";

type Rect = {
    x: number,
    y: number,
    w: number,
    h: number
};

type AudioMap = number[][];

export class AudioManager {
    private bgMusic: HTMLAudioElement;
    private audios: {[key: string]: HTMLAudioElement} = {};
    private readonly bgVolume = 0.3;
    private readonly soundEffectVolume = 0.7;
    private isMuted: boolean = false;

    private readonly TILE_SIZE = 32;

    constructor(
        private readonly audioMap: AudioMap
    ) {
        this.loadSoundEffect('throw-arrow', '../assets/audio/throw-arrow.mp3');
        this.loadSoundEffect('throw-fire-ball', '../assets/audio/throw-fire-ball.mp3');

        this.bgMusic = new Audio();
        this.bgMusic.volume = this.bgVolume;
        this.bgMusic.loop = true;
    }

    public update(playerRect: Rect): void {
        const playerCenter = {
            x: playerRect.x + playerRect.w / 2,
            y: playerRect.y + playerRect.h / 2
        }

        const playerTile = {
            x: Math.floor(playerCenter.x / this.TILE_SIZE),
            y: Math.floor(playerCenter.y / this.TILE_SIZE)
        }

        const audioLine = this.audioMap[playerTile.y];
        assertDefined(audioLine, "La ligne n'est pas présente dans audioMap");
        const musicName = 'bg-music-' + audioLine[playerTile.x];

        this.playBgMusic(musicName);
    }

    private playBgMusic(name: string): void {
        if (
            this.isMuted
            || !this.audios[name]
            || this.audios[name] === this.bgMusic
        ) return;

        this.bgMusic = this.audios[name];
        this.bgMusic.volume = this.bgVolume;
        this.bgMusic.loop = true;
        this.bgMusic.play().catch(() => {});
    }

    public playSoundEffect(name: string): void {
        if (this.isMuted || !this.audios[name]) return;

        const clone = this.audios[name].cloneNode() as HTMLAudioElement;
        clone.volume = this.soundEffectVolume;
        clone.play().catch(() => {});
    }

    public toggleMute(): boolean {
        this.isMuted = !this.isMuted;
        return this.isMuted;
    }

    private loadSoundEffect(name: string, src: string): void {
        const audio = new Audio(src);
        audio.volume = this.soundEffectVolume
        this.audios[name] = audio;
    }
}