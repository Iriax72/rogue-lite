import { getImage, assertDefined } from "../usefull/functions.js";
import { dist } from "../usefull/geometry.js";

import { Game } from "./Game.js";
import { Player } from "./Player.js";
import { Lamp } from "./Environnement/Lamp.js";
import { FireBall } from "./shoots/FireBall.js";
import { Inputs } from "./Inputs.js";

type Rect = {
    x: number,
    y: number,
    w: number,
    h: number
};

export class ATH {
    private readonly LIGHT_RADIUS = 70; // px
    private readonly MENU_SIZE = 75 / 100; // % du canvas
    
    private readonly BTN_WIDTH = 200; // px
    private readonly BTN_HEIGHT = 75; // px

    private readonly DIALOG_WIDTH = 200; // px
    private readonly DIALOG_HEIGHT = 80; // px

    private readonly containerImg: HTMLImageElement;
    private readonly lightCanvas: HTMLCanvasElement;

    private buttons: {rect: Rect, onClick: Function}[] = [];

    constructor(
        private readonly canvas: HTMLCanvasElement,
        private readonly player: Player,
        private readonly lamps: Lamp[],
        private readonly inputs: Inputs
    ) {
        this.containerImg = getImage('container-img');
        this.lightCanvas = document.createElement('canvas');

        this.canvas.addEventListener('click', (e: PointerEvent) => {
            this.buttons.forEach(btn => {
                if (dist(btn.rect, {x: e.offsetX, y: e.offsetY, w: 0, h: 0}) === 0) {
                    btn.onClick();
                }
            });
        });
    }

    public update(isDialoging: boolean, game: Game): void {
        if (!isDialoging) {
            return;
        }
        const mouseRect = {
            x: this.inputs.mouse.x,
            y: this.inputs.mouse.y,
            w: 0,
            h: 0
        }
        if (this.inputs.mouse.justDown && dist(mouseRect, {
            x: this.canvas.width / 2 - this.DIALOG_WIDTH / 2,
            y: this.canvas.height - this.DIALOG_HEIGHT - 30,
            w: this.DIALOG_WIDTH,
            h: this.DIALOG_HEIGHT
        }) === 0) {
            game.nextDialog();
        }
    }

    public draw(isPaused: boolean, fireBalls: FireBall[], isDialoging: boolean = false, dialogs: string[] = [], currentDialogIndex: number = 0): void {
        const ctx: CanvasRenderingContext2D | null = this.canvas.getContext('2d');
        if (!ctx) {
            return;
        }

        // Découper les lumières dans un calque pour préserver la scène.
        if (this.lightCanvas.width !== this.canvas.width || this.lightCanvas.height !== this.canvas.height) {
            this.lightCanvas.width = this.canvas.width;
            this.lightCanvas.height = this.canvas.height;
        }
        const lightCtx = this.lightCanvas.getContext('2d');
        if (!lightCtx) {
            return;
        }
        lightCtx.clearRect(0, 0, this.lightCanvas.width, this.lightCanvas.height);
        lightCtx.save();
        lightCtx.fillStyle= 'rgba(0, 0, 0, 0.8)';
        lightCtx.fillRect(0, 0, this.lightCanvas.width, this.lightCanvas.height); 
        // Décommenter pour réactiver les effets de lumieère TODO!!
        lightCtx.globalCompositeOperation = 'destination-out';

        const playerRect = this.player.getRect();
        this.drawLightSource(lightCtx, playerRect.x + playerRect.w / 2, playerRect.y + playerRect.h / 2, this.LIGHT_RADIUS);

        this.lamps.forEach(lamp => {
            this.drawLightSource(lightCtx, lamp.getRect().x + lamp.getRect().w / 2, lamp.getRect().y + lamp.getRect().h / 2, 28)
        });

        fireBalls.forEach(fb => {
            this.drawLightSource(lightCtx, fb.getRect().x, fb.getRect().y, 7);
        })

        lightCtx.restore();
        ctx.drawImage(this.lightCanvas, 0, 0);

        // Afficher s'il le faut les dialogues
        if (isDialoging) {
            assertDefined(dialogs[currentDialogIndex], "La donée dialogs[currentDialogIndex] n'est pas définie");
            this.drawDialog(ctx, dialogs[currentDialogIndex]);
        }

        // Afficher les infos en haut à gauche
        ctx.fillStyle = 'orange';
        ctx.font = '20px Arial';
        ctx.fillText(`Gold: ${this.player.gold}|`, 10, 20);
        ctx.fillText(`Mana: ${this.player.mana}|`, 10, 60)
        ctx.fillText(`Health: ${this.player.health}|`, 10, 100);

        // Afficher s'il le faut le menu de pause
        if (isPaused) {
            this.drawMenu(ctx);
        }
    }

    private drawLightSource(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number): void {
        const gradiant = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradiant.addColorStop(0, 'white');
        gradiant.addColorStop(0.7, 'rgba(255, 255, 255, 0.5)')
        gradiant.addColorStop(1, 'transparent');

        ctx.fillStyle = gradiant;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2*Math.PI);
        ctx.fill();
    }

    private drawDialog(ctx: CanvasRenderingContext2D, text: string) {
        ctx.drawImage(
            this.containerImg,
            this.canvas.width / 2 - this.DIALOG_WIDTH / 2,
            this.canvas.height - this.DIALOG_HEIGHT - 30,
            this.DIALOG_WIDTH,
            this.DIALOG_HEIGHT
        );
        ctx.fillStyle= '#edc';
        ctx.fillText(
            text,
            this.canvas.width / 2 - this.DIALOG_WIDTH + 6,
            this.canvas.height - this.DIALOG_HEIGHT / 2 - 30,
            this.DIALOG_WIDTH - 12
        );
    }

    private drawMenu(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'rgba(0, 0, 0, 40)'
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.buttons = []

        const gradiant = ctx.createRadialGradient(
            this.canvas.width / 2,
            this.canvas.height / 2,
            this.canvas.width * this.MENU_SIZE * 0.15,
            this.canvas.width / 2,
            this.canvas.height / 2,
            this.canvas.width * this.MENU_SIZE * 0.7
        );
        gradiant.addColorStop(0, '#a50');
        gradiant.addColorStop(1, '#000');
        ctx.fillStyle = gradiant;
        ctx.fillRect(
            this.canvas.width / 2 - this.canvas.width * this.MENU_SIZE / 2,
            this.canvas.height / 2 - this.canvas.height * this.MENU_SIZE / 2,
            this.canvas.width * this.MENU_SIZE,
            this.canvas.height * this.MENU_SIZE
        );

        this.createBtn(ctx, {
                x: this.canvas.width / 2 - this.BTN_WIDTH / 2,
                y: this.canvas.height * (1-this.MENU_SIZE) / 2 + (this.canvas.height * this.MENU_SIZE - 3 * this.BTN_HEIGHT) / 4,
                w: this.BTN_WIDTH,
                h: this.BTN_HEIGHT
            }, 'Reprendre', () => {/* TODO */}
        );
        this.createBtn(ctx, {
                x: this.canvas.width / 2 - this.BTN_WIDTH / 2,
                y: this.canvas.height * (1-this.MENU_SIZE) / 2 + (this.canvas.height * this.MENU_SIZE - 3 * this.BTN_HEIGHT) / 4 * 2 + this.BTN_HEIGHT,
                w: this.BTN_WIDTH,
                h: this.BTN_HEIGHT
            }, 'Contrôles', () => {/* TODO */}
        );
        this.createBtn(ctx, {
                x: this.canvas.width / 2 - this.BTN_WIDTH / 2,
                y: this.canvas.height * (1-this.MENU_SIZE) / 2 + (this.canvas.height * this.MENU_SIZE - 3 * this.BTN_HEIGHT) / 4 * 3 + this.BTN_HEIGHT * (3 - 1),
                w: this.BTN_WIDTH,
                h: this.BTN_HEIGHT
            }, 'Quitter', () => {
                window.location.replace('./'); // ammene à l'index: le menu
            }
        );
    }

    private createBtn(ctx: CanvasRenderingContext2D, rect: Rect, text: string, onClick: Function): void {
        ctx.drawImage(
            this.containerImg,
            rect.x,
            rect.y,
            rect.w,
            rect.h
        );
        ctx.fillStyle = '#edc';
        ctx.fillText(text, rect.x, rect.y + rect.h / 2, rect.w);
        this.buttons.push({rect, onClick});
    }
}