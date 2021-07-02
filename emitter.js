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
        // Normalise resolution to be divisible by 360
        resolution = 360 / resolution / 1200

        // Clear the rays array
        this.rays = [];

        // Redraw all rays with calculated resolution
        let rotationOffset1 = -90 - this.fov / 2
        for (let i = rotationOffset1; i < this.fov + rotationOffset1; i += resolution) this.rays.push(new Ray(this.pos, radians(i)))
    }

    cast(colliders) {
        // Loop over all rays
        this.rays.forEach(ray => {
            // Keep track of the closest intersection (relative to the emitter)
            let closest

            // Keep track of the smallest distance to the emitter
            let record = Infinity

            // Loop over all colliders
            colliders.forEach(collider => {

                // Find this intersection with the collider and the ray
                const intersection = ray.cast(collider)

                // If there is an intersection
                if (intersection) {

                    // Calculate the distance between the emitter and the intersection
                    let distance = min(record, p5.Vector.dist(intersection, this.pos))

                    // If the distance is a new lowest distance
                    if (distance < record) {

                        // Save the lowest distance and point
                        record = distance
                        closest = intersection
                    }
                }
            });

            // If a point has been found, draw a line between the emitter and the point
            if (closest) line(ray.pos.x, ray.pos.y, closest.x, closest.y)
        });
    }
}