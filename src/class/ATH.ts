import { Player } from "./Player";

export class ATH {
    canvas: HTMLCanvasElement;
    player: Player;
    
    constructor(canvas: HTMLCanvasElement, player: Player) {
        this.canvas = canvas;
        this.player = player;
    }

    draw(): void {
        const ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');
        ctx.fillStyle = 'orange';
        ctx.font = '20px Arial';
        ctx.fillText(`Gold: ${this.player.gold}|`, 10, 20);
        ctx.fillText(`Health: ${this.player.health}|`, 10, 60);
    }
}