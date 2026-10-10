import { getImage, extractImgFromSprite, assertDefined } from "../../../usefull/functions.js";
import { dist, getCorners, Vector2D } from "../../../usefull/geometry.js";
import { rdm, choice } from "../../../usefull/random.js";
import { Boss } from "./Boss.js";
import { Player } from "../../Player.js";
import { GolemBullet } from "../../shoots/GolemBullet.js";
export class Golem extends Boss {
    room;
    speed = 0.06; // px / ms
    targetCornerIndex = null;
    isAttacking = false;
    bullets = [];
    constructor(x, y, room, dropLootFunc, player) {
        const img = getImage("golem-sprite");
        const phaseConfig = {
            initialPhase: () => new Phase1(),
            transitions: [
                { healthPercent: 0.5, createPhase: () => new Phase2() }
            ]
        };
        super(x, y, 130, 130, 50, extractImgFromSprite(img, 0, 0, 100, 100), { gold: 100, mana: 30 }, dropLootFunc, phaseConfig, player);
        this.room = room;
    }
    moveTo(point, deltaTime) {
        const direction = new Vector2D(point.x - this.x, point.y - this.y);
        const remainingDistance = direction.length();
        const distanceToMove = deltaTime * this.speed;
        if (remainingDistance <= distanceToMove) {
            this.x = point.x;
            this.y = point.y;
            return true;
        }
        const movement = direction.normalize().amplify(distanceToMove);
        this.x += movement.x;
        this.y += movement.y;
        return false;
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.bullets.forEach(b => b.update(deltaTime));
        if (this.isDead)
            return;
        if (this.isAttacking) {
            this.attackPhase();
        }
        else {
            this.move(deltaTime);
        }
    }
    draw(ctx) {
        super.draw(ctx);
        this.bullets.forEach(b => b.draw(ctx));
    }
    move(deltaTime) {
        const corners = getCorners(this.room);
        if (this.targetCornerIndex === null) {
            const golemPosition = this.getRect();
            let nearestCornerIndex = 0;
            let nearestDistance = Number.POSITIVE_INFINITY;
            corners.forEach((corner, index) => {
                const distance = dist(golemPosition, corner);
                if (distance < nearestDistance) {
                    nearestCornerIndex = index;
                    nearestDistance = distance;
                }
            });
            this.targetCornerIndex = this.chooseAdjacentCorner(nearestCornerIndex);
        }
        const targetCorner = corners[this.targetCornerIndex];
        assertDefined(targetCorner, 'Le targetCorner n\'est pas défini');
        if (this.moveTo(targetCorner, deltaTime)) {
            this.isAttacking = true;
            this.targetCornerIndex = this.chooseAdjacentCorner(this.targetCornerIndex);
        }
    }
    chooseAdjacentCorner(currentCornerIndex) {
        return choice([
            (currentCornerIndex + 1) % 4,
            (currentCornerIndex + 3) % 4
        ]);
    }
}
class Phase1 {
    name = "Phase 1";
    attack(boss) {
        if (rdm(0.5)) {
            this.throwBullet(boss);
        }
        else {
            console.log("Je n'ai pas attaqué");
        }
        boss.isAttacking = false;
    }
    throwBullet(boss) {
        boss.bullets.push(new GolemBullet(boss.getRect().x + boss.getRect().w, boss.getRect().y + boss.getRect().h / 2, 0));
    }
    enter(_boss) { }
}
class Phase2 {
    name = "Phase 2";
    attack(_boss) { }
    enter(_boss) { }
}
