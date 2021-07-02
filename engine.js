// Scene dimensions of a single block (half the scene)
const sceneWidth = 600
const sceneHeight = 600

// Scene colliders
const colliders = []

// Holds the emitter
let emitter

function setup() {
    // Create a canvas twice the width, for side by side view (map, first person)
    createCanvas(sceneWidth * 2, sceneHeight)

    // Draw walls
    colliders.push(new Collider(0, 0, sceneWidth, 0))
    colliders.push(new Collider(sceneWidth, 0, sceneWidth, sceneHeight))
    colliders.push(new Collider(sceneWidth, sceneHeight, 0, sceneHeight))
    colliders.push(new Collider(0, sceneHeight, 0, 0))

    // Draw objects
    colliders.push(new Collider(150, 50, sceneWidth - 50, 250))
    colliders.push(new Collider(400, 200, 500, 450))

    // Create a new Emitter
    emitter = new Emitter(359.9, 0.1)
}

function draw() {
    // Set the background to blackddd
    background(0)

    emitter.translate(mouseX, mouseY)

    // Cast all rays to all colliders, draw a line if the ray collides
    stroke(255, 50)
    emitter.cast(colliders)
    stroke(255, 255)

    // Render all colliders
    colliders.forEach(col => col.render())

    // Draw a circle at the emitter's location
    // Also draw the rays' direction vectors
    emitter.render()
}