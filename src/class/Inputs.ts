export class Inputs {
    public keys: {[key: string]: boolean} = {};
    public mouse = {x: 0, y: 0, down: false}

    constructor(canvas: HTMLCanvasElement) {
        window.addEventListener('keydown', (e: KeyboardEvent): void => {
            this.keys[e.key] = true;
        });
        window.addEventListener('keyup', (e: KeyboardEvent): void => {
            this.keys[e.key] = false;
        });

        canvas.addEventListener('mousedown', (e: MouseEvent): void => {
            this.mouse.down = true;
        });
        canvas.addEventListener('mouseup', (e: MouseEvent): void => {
            this.mouse.down = false;
        });
        canvas.addEventListener('mousemove', (e: MouseEvent): void => {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
        });
    }

    getMousePos(): {x: number, y: number} {
        return {
            x: this.mouse.x,
            y: this.mouse.y
        }
    }
}