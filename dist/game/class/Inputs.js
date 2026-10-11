export class Inputs {
    onFirstInteraction;
    keys = {};
    keysJustPressed = {};
    mouse = { x: 0, y: 0, down: false, justDown: false };
    hasInteracated = false;
    constructor(canvas, onFirstInteraction) {
        this.onFirstInteraction = onFirstInteraction;
        window.addEventListener('keydown', (e) => {
            this.notifyFirstInteraction();
            this.keys[e.key] = true;
            this.keysJustPressed[e.key] = true;
        });
        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
        canvas.addEventListener('mousedown', () => {
            this.notifyFirstInteraction();
            this.mouse.down = true;
            this.mouse.justDown = true;
        });
        canvas.addEventListener('mouseup', () => {
            this.mouse.down = false;
        });
        canvas.addEventListener('mousemove', (e) => {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
        });
    }
    getMousePos() {
        return {
            x: this.mouse.x,
            y: this.mouse.y
        };
    }
    update() {
        this.keysJustPressed = {};
        this.mouse.justDown = false;
    }
    notifyFirstInteraction() {
        if (this.hasInteracated)
            return;
        this.hasInteracated = true;
        this.onFirstInteraction();
    }
}
