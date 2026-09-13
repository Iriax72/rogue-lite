import { Player } from "./Player.js";

export class ATH {
    private readonly LIGHT_RADIUS = 25; // px
    private readonly MENU_SIZE = 75 / 100; // % du canvas
    private readonly MENU_BORDER_WIDTH = 8; // px

    constructor(
        private readonly canvas: HTMLCanvasElement,
        private readonly player: Player
    ) {}

    public draw(isPaused: boolean): void {
        const ctx: CanvasRenderingContext2D | null = this.canvas.getContext('2d');
        if (!ctx) {
            return;
        }

        // Dessiner l'effet de lumière
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

        // Afficher les infos en haut à gauche
        ctx.fillStyle = 'orange';
        ctx.font = '20px Arial';
        ctx.fillText(`Gold: ${this.player.gold}|`, 10, 20);
        ctx.fillText(`Mana: ${this.player.mana}|`, 10, 60)
        ctx.fillText(`Health: ${this.player.health}|`, 10, 100);

        // Afficher s'il le faut le menu de pause
        if (!isPaused) {
            return;
        }
        this.drawMenu(ctx);
        ctx.fillStyle = 'white';
        ctx.fillText('Le jeu est en PAUSE', this.canvas.width / 2, this.canvas.height / 2);
    }

    private drawMenu(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'rgba(0, 0, 0, 70)'
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.fillStyle = 'darkblue';
        ctx.fillRect(
            this.canvas.width / 2 - this.canvas.width * this.MENU_SIZE / 2,
            this.canvas.height / 2 - this.canvas.height * this.MENU_SIZE / 2,
            this.canvas.width * this.MENU_SIZE,
            this.canvas.height * this.MENU_SIZE
        );
        ctx.fillStyle = 'blue';
        ctx.fillRect(
            this.canvas.width / 2 - this.canvas.width * this.MENU_SIZE / 2 + this.MENU_BORDER_WIDTH,
            this.canvas.height / 2 - this.canvas.height * this.MENU_SIZE / 2 + this.MENU_BORDER_WIDTH,
            this.canvas.width * this.MENU_SIZE - this.MENU_BORDER_WIDTH,
            this.canvas.height * this.MENU_SIZE - this.MENU_BORDER_WIDTH
        );
    }
}