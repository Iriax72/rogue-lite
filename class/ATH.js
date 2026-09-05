export class ATH {
    canvas;
    player;
    
    constructor(canvas, player) {
        this.canvas = canvas;
        this.player = player;
    }

    draw() {
        const ctx = this.canvas.getContext('2d');
        ctx.fillStyle = 'orange';
        ctx.font = '20px Arial';
        ctx.fillText(`Gold: ${this.player.gold}|`, 10, 20);
    }
}