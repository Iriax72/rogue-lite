import { Player } from "./Player.js";

export class ATH {
    constructor(
        private readonly canvas: HTMLCanvasElement,
        private readonly player: Player
    ) {}

    public draw(): void {
        const ctx: CanvasRenderingContext2D | null = this.canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        ctx.fillStyle = 'orange';
        ctx.font = '20px Arial';
        ctx.fillText(`Gold: ${this.player.gold}|`, 10, 20);
        ctx.fillText(`Health: ${this.player.health}|`, 10, 60);
    }
}