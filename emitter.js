class Emitter {
    constructor(fov, resolution) {
        this.fov = fov
        this.resolution = resolution
        this.pos = createVector(width / 2, height / 2)
        this.rays = []
        this.heading = 0;

        // Create rays
        this.createRays(resolution)
    }

    render() {
        push()
        translate(this.pos.x, this.pos.y)
        circle(0, 0, 10)
        pop()

        this.rays.forEach(ray => ray.render());
    }

    translate(x, y) {
        this.pos.set(x, y)
        this.rays.forEach(ray => ray.translate(this.pos))
    }

    setResolution(resolution) {
        this.resolution = resolution
        this.createRays(resolution);
    }

    createRays(resolution) {
        resolution = 360 / resolution / 1200
        this.rays = [];
        let rotationOffset1 = -90 - this.fov / 2
        for (let i = rotationOffset1; i < this.fov + rotationOffset1; i += resolution) this.rays.push(new Ray(this.pos, radians(i)))
    }

    cast(colliders) {
        this.rays.forEach(ray => {
            let closest
            let record = Infinity
            colliders.forEach(collider => {
                const intersection = ray.cast(collider)
                if (intersection) {
                    let distance = min(record, p5.Vector.dist(intersection, this.pos))
                    if (distance < record) {
                        record = distance
                        closest = intersection
                    }
                }
            });

            if (!closest) return
            line(ray.pos.x, ray.pos.y, closest.x, closest.y)
        });
    }
}