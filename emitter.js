class Emitter {
    constructor(fov, resolution) {
        this.fov = fov
        this.resolution = resolution
        this.pos = createVector(sceneWidth / 2, sceneHeight / 2)
        this.rays = []
        this.heading = 0;

        let rotationOffset = -90 - fov / 2

        // Create rays
        for (let i = rotationOffset; i < fov + rotationOffset; i += resolution) this.rays.push(new Ray(this.pos, radians(i)))
    }

    render() {
        push()
        translate(this.pos.x, this.pos.y)
        circle(0, 0, 10)
        pop()

        this.rays.forEach(ray => ray.render());
    }

    translate(x, y) {
        // return if position is invalid
        if (x < 0 || x > sceneWidth || y < 0 || y > sceneHeight) return;

        this.pos.set(x, y)
        this.rays.forEach(ray => ray.translate(this.pos))
    }

    cast(colliders) {
        this.rays.forEach(ray => {
            let closest
            let record = Infinity
            colliders.forEach(collider => {
                const intersection = ray.cast(collider)
                if (!intersection) return
                let distance = min(record, dist(intersection, this.pos))
                if (distance < record)
                    record = distance
                closest = intersection
            });

            if (!closest) return
            line(ray.pos.x, ray.pos.y, closest.x, closest.y)
        });
    }
}