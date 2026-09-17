import { collides } from "../functions.js";

import { Player } from "./Player.js";

type Rect = {
    x: number,
    y: number,
    w: number,
    h: number
};

export class ATH {
    private readonly LIGHT_RADIUS = 25; // px
    private readonly MENU_SIZE = 75 / 100; // % du canvas
    private readonly MENU_BORDER_WIDTH = 8; // px
    private readonly BTN_WIDTH = 120; // px
    private readonly BTN_HEIGHT = 40; // px

    private buttons: {rect: Rect, onClick: Function}[] = [];

    constructor(
        private readonly canvas: HTMLCanvasElement,
        private readonly player: Player
    ) {
        this.canvas.addEventListener('click', (e: PointerEvent) => {
            this.buttons.forEach(btn => {
                if (collides(btn.rect, {x: e.offsetX, y: e.offsetY, w: 0, h: 0})) {
                    btn.onClick();
                }
            });
        });
    }

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
    }

    private drawMenu(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'rgba(0, 0, 0, 70)'
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.buttons = []

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

        this.createBtn(ctx, {
                x: this.canvas.width / 2 - this.BTN_WIDTH / 2,
                y: this.canvas.height * (1-this.MENU_SIZE) / 2 + (this.canvas.height * this.MENU_SIZE - 3 * this.BTN_HEIGHT),
                w: this.BTN_WIDTH,
                h: this.BTN_HEIGHT
            }, 'Reprendre', () => {
                console.log('Reprendre clique (1)');
            }
        );
        this.createBtn(ctx, {
                x: this.canvas.width / 2 - this.BTN_WIDTH / 2,
                y: this.canvas.height * (1-this.MENU_SIZE) / 2 + (this.canvas.height * this.MENU_SIZE - 3 * this.BTN_HEIGHT) * 2 + this.BTN_HEIGHT,
                w: this.BTN_WIDTH,
                h: this.BTN_HEIGHT
            }, 'Contrôles', () => {
                console.log('Controles clique (2)');
            }
        );
        this.createBtn(ctx, {
                x: this.canvas.width / 2 - this.BTN_WIDTH / 2,
                y: this.canvas.height * (1-this.MENU_SIZE) / 2 + (this.canvas.height * this.MENU_SIZE - 3 * this.BTN_HEIGHT) * 3 + this.BTN_HEIGHT * 2,
                w: this.BTN_WIDTH,
                h: this.BTN_HEIGHT
            }, 'Quitter', () => {
                console.log('Quitter clique (3)');
            }
        );
    }

    private createBtn(ctx: CanvasRenderingContext2D, rect: Rect, text: string, onClick: Function): void {
        ctx.fillStyle= 'orange';
        ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
        ctx.fillText(text, rect.x, rect.y + rect.h / 2, rect.w);
        /*
        this.canvas.addEventListener('click', (e: PointerEvent) => {
            if (collides(rect, {x: e.offsetX, y: e.offsetY, w: 0, h: 0})) {
                onClick();
            }
        });
        */
        this.buttons.push({rect, onClick});
    }
}