import { Player } from "./Player.js";

export class ATH {
    private readonly LIGHT_RADIUS = 25;

    constructor(
        private readonly canvas: HTMLCanvasElement,
        private readonly player: Player
    ) {}

    public draw(): void {
        const ctx: CanvasRenderingContext2D | null = this.canvas.getContext('2d');
        if (!ctx) {
            return;
        }

        const lightGradiant = ctx.createRadialGradient(
            this.player.getRect().x,
            this.player.getRect().y,
            this.LIGHT_RADIUS,
            this.player.getRect().x,
            this.player.getRect().y,
            12 * this.LIGHT_RADIUS
        );
        lightGradiant.addColorStop(0, 'transparent');
        lightGradiant.addColorStop(1, 'black');
        ctx.fillStyle = lightGradiant;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.fillStyle = 'orange';
        ctx.font = '20px Arial';
        ctx.fillText(`Gold: ${this.player.gold}|`, 10, 20);
        ctx.fillText(`Health: ${this.player.health}|`, 10, 60);
    }
}