import { getImage, assertDefined } from "../usefull/functions.js";
import { dist } from "../usefull/geometry.js";
import { Game } from "./Game.js";
import { Player } from "./Player.js";
import { Lamp } from "./Environnement/Lamp.js";
import { FireBall } from "./shoots/FireBall.js";
import { Inputs } from "./Inputs.js";
import { Boss } from "./enemys/boss/Boss.js";
export class ATH {
    canvas;
    player;
    lamps;
    inputs;
    LIGHT_RADIUS = 70; // px
    MENU_SIZE = 75 / 100; // % du canvas
    BTN_WIDTH = 200; // px
    BTN_HEIGHT = 75; // px
    DIALOG_WIDTH = 200; // px
    DIALOG_HEIGHT = 80; // px
    containerImg;
    lightCanvas;
    buttons = [];
    constructor(canvas, player, lamps, inputs) {
        this.canvas = canvas;
        this.player = player;
        this.lamps = lamps;
        this.inputs = inputs;
        this.containerImg = getImage('container-img');
        this.lightCanvas = document.createElement('canvas');
        this.canvas.addEventListener('click', (e) => {
            this.buttons.forEach(btn => {
                if (dist(btn.rect, { x: e.offsetX, y: e.offsetY, w: 0, h: 0 }) === 0) {
                    btn.onClick();
                }
            });
        });
    }
    update(isDialoging, game) {
        if (!isDialoging) {
            return;
        }
        const mouseRect = {
            x: this.inputs.mouse.x,
            y: this.inputs.mouse.y,
            w: 0,
            h: 0
        };
        if (this.inputs.mouse.justDown && dist(mouseRect, {
            x: this.canvas.width / 2 - this.DIALOG_WIDTH / 2,
            y: this.canvas.height - this.DIALOG_HEIGHT - 30,
            w: this.DIALOG_WIDTH,
            h: this.DIALOG_HEIGHT
        }) === 0) {
            game.nextDialog();
        }
    }
    draw(boss, isPaused, fireBalls, isDialoging = false, dialogs = [], currentDialogIndex = 0) {
        const ctx = this.canvas.getContext('2d');
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
        lightCtx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        lightCtx.fillRect(0, 0, this.lightCanvas.width, this.lightCanvas.height);
        // Décommenter pour réactiver les effets de lumieère TODO!!
        lightCtx.globalCompositeOperation = 'destination-out';
        const playerRect = this.player.getRect();
        this.drawLightSource(lightCtx, playerRect.x + playerRect.w / 2, playerRect.y + playerRect.h / 2, this.LIGHT_RADIUS);
        this.lamps.forEach(lamp => {
            this.drawLightSource(lightCtx, lamp.getRect().x + lamp.getRect().w / 2, lamp.getRect().y + lamp.getRect().h / 2, 28);
        });
        fireBalls.forEach(fb => {
            this.drawLightSource(lightCtx, fb.getRect().x, fb.getRect().y, 7);
        });
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
        ctx.fillText(`Mana: ${this.player.mana}|`, 10, 60);
        ctx.fillText(`Health: ${this.player.health}|`, 10, 100);
        // Afficher s'il le faut le menu de pause
        if (isPaused) {
            this.drawMenu(ctx);
        }
        // Afficher s'il le faut la barre de pv du boss
        if (boss.length > 0) {
            assertDefined(boss[0], "Une erreur impossible est survenue");
            let nearestBoss = boss[0];
            boss.forEach(boss => {
                if (dist(boss.getRect(), this.player.getRect()) < dist(nearestBoss.getRect(), this.player.getRect())) {
                    nearestBoss = boss;
                }
            });
            if (dist(this.player.getRect(), nearestBoss.getRect()) < 300) {
                this.drawHpBar(ctx, nearestBoss.health / nearestBoss.max_hp * 100);
            }
        }
    }
    drawLightSource(ctx, x, y, radius) {
        const gradiant = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradiant.addColorStop(0, 'white');
        gradiant.addColorStop(0.7, 'rgba(255, 255, 255, 0.5)');
        gradiant.addColorStop(1, 'transparent');
        ctx.fillStyle = gradiant;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
    }
    drawDialog(ctx, text) {
        ctx.drawImage(this.containerImg, this.canvas.width / 2 - this.DIALOG_WIDTH / 2, this.canvas.height - this.DIALOG_HEIGHT - 30, this.DIALOG_WIDTH, this.DIALOG_HEIGHT);
        ctx.fillStyle = '#edc';
        ctx.fillText(text, this.canvas.width / 2 - this.DIALOG_WIDTH + 6, this.canvas.height - this.DIALOG_HEIGHT / 2 - 30, this.DIALOG_WIDTH - 12);
    }
    drawMenu(ctx) {
        ctx.fillStyle = 'rgba(0, 0, 0, 40)';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.buttons = [];
        const gradiant = ctx.createRadialGradient(this.canvas.width / 2, this.canvas.height / 2, this.canvas.width * this.MENU_SIZE * 0.15, this.canvas.width / 2, this.canvas.height / 2, this.canvas.width * this.MENU_SIZE * 0.7);
        gradiant.addColorStop(0, '#a50');
        gradiant.addColorStop(1, '#000');
        ctx.fillStyle = gradiant;
        ctx.fillRect(this.canvas.width / 2 - this.canvas.width * this.MENU_SIZE / 2, this.canvas.height / 2 - this.canvas.height * this.MENU_SIZE / 2, this.canvas.width * this.MENU_SIZE, this.canvas.height * this.MENU_SIZE);
        this.createBtn(ctx, {
            x: this.canvas.width / 2 - this.BTN_WIDTH / 2,
            y: this.canvas.height * (1 - this.MENU_SIZE) / 2 + (this.canvas.height * this.MENU_SIZE - 3 * this.BTN_HEIGHT) / 4,
            w: this.BTN_WIDTH,
            h: this.BTN_HEIGHT
        }, 'Reprendre', () => { });
        this.createBtn(ctx, {
            x: this.canvas.width / 2 - this.BTN_WIDTH / 2,
            y: this.canvas.height * (1 - this.MENU_SIZE) / 2 + (this.canvas.height * this.MENU_SIZE - 3 * this.BTN_HEIGHT) / 4 * 2 + this.BTN_HEIGHT,
            w: this.BTN_WIDTH,
            h: this.BTN_HEIGHT
        }, 'Contrôles', () => { });
        this.createBtn(ctx, {
            x: this.canvas.width / 2 - this.BTN_WIDTH / 2,
            y: this.canvas.height * (1 - this.MENU_SIZE) / 2 + (this.canvas.height * this.MENU_SIZE - 3 * this.BTN_HEIGHT) / 4 * 3 + this.BTN_HEIGHT * (3 - 1),
            w: this.BTN_WIDTH,
            h: this.BTN_HEIGHT
        }, 'Quitter', () => {
            window.location.replace('./'); // ammene à l'index: le menu
        });
    }
    drawHpBar(ctx, percent) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.canvas.width * 0.18, 40, this.canvas.width * 0.44, 12);
        ctx.fillStyle = 'green';
        ctx.fillRect(this.canvas.width * 0.18 * percent / 100, 40, this.canvas.width * 0.44, 12);
    }
    createBtn(ctx, rect, text, onClick) {
        ctx.drawImage(this.containerImg, rect.x, rect.y, rect.w, rect.h);
        ctx.fillStyle = '#edc';
        ctx.fillText(text, rect.x, rect.y + rect.h / 2, rect.w);
        this.buttons.push({ rect, onClick });
    }
}
