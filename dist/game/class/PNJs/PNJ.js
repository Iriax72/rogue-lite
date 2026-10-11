import { dist } from "../../usefull/geometry.js";
import { Entity } from "../Entity.js";
import { Game } from "../Game.js";
import { Inputs } from "../Inputs.js";
export class PNJ extends Entity {
    img;
    game;
    inputs;
    dialog;
    constructor(x, y, width, height, img, game, inputs, dialog) {
        super(x, y, width, height);
        this.img = img;
        this.game = game;
        this.inputs = inputs;
        this.dialog = dialog;
    }
    update() {
        const mousePos = this.inputs.getMousePos();
        if (dist(this.getRect(), this.game.player.getRect()) <= this.game.MAX_DIALOG_DIST
            && this.inputs.mouse.justDown
            && dist(this.getRect(), {
                x: mousePos.x,
                y: mousePos.y,
                w: 0,
                h: 0
            }) === 0) {
            this.game.dialog(this.getRect(), this.dialog);
        }
    }
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}
