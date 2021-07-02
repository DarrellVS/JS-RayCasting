class Ray {
    constructor(pos, dir) {
        this.translate(pos)
        this.setAngle(dir)
    }

    render() {
        push()
        translate(this.pos.x, this.pos.y)
        line(0, 0, this.dir.x * 10, this.dir.y * 10)
        pop()
    }

    translate(pos) {
        this.pos = pos
    }

    setAngle(angle) {
        this.dir = p5.Vector.fromAngle(angle);
    }

    cast(collider) {
        // Implements line to line intersection algorithm
        // src: https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection 

        const x1 = collider.a.x
        const y1 = collider.a.y
        const x2 = collider.b.x
        const y2 = collider.b.y
        const x3 = this.pos.x
        const y3 = this.pos.y
        const x4 = this.pos.x + this.dir.x
        const y4 = this.pos.y + this.dir.y

        // calculate the denominator of the division
        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)

        // Return if lines are parallel, cannot divide by 0
        if (den == 0) return

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den

        // Return collision point if there is one
        if (t >= 0 && t <= 1 && u > 0) return createVector(
            t * (x2 - x1) + x1,
            t * (y2 - y1) + y1
        )
    }
}