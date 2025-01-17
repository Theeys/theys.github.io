import { Entity } from "./entity.js"

export class EntityWithBoxCollision extends Entity {
    constructor(entityProps) {
        super(entityProps)
        this.boxCollision = {
            pos: [this.pos[0] - this.size, this.pos[1] - this.size],
            size: [this.size, this.size],
        }
    }

    draw(ctx) {
        super.draw(ctx)
        if (!this.debug) return
        ctx.save()
        ctx.strokeStyle = "red"
        ctx.lineWidth = 2
        ctx.strokeRect(
            this.boxCollision.pos[0],
            this.boxCollision.pos[1],
            this.boxCollision.size[0],
            this.boxCollision.size[1]
        )
        ctx.restore()
    }

    updateCollisionBox() {
        for (let i = 0; i < this.pos.length; i++) {
            const size = Array.isArray(this.size) ? this.size[i] : this.size
            this.boxCollision.pos[i] = this.pos[i] - size
        }

        for (let i = 0; i < this.boxCollision.size.length; i++) {
            const size = Array.isArray(this.size) ? this.size[i] : this.size
            this.boxCollision.size[i] = size * 2
        }
    }

    isCollided(rectB) {
        const rectA = this.boxCollision
        return (
            rectA.pos[0] < rectB.pos[0] + rectB.size[0] &&
            rectA.pos[0] + rectA.size[0] > rectB.pos[0] &&
            rectA.pos[1] < rectB.pos[1] + rectB.size[1] &&
            rectA.pos[1] + rectA.size[1] > rectB.pos[1]
        )
    }

    update(game) {
        super.update(game)
        this.updateCollisionBox()
    }
}
