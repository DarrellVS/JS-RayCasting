// Scene colliders
const colliders = []

// Holds the emitter
let emitter

// inputs
let resolutionSlider;

let lastResolutionVal = -1;

function setup() {
    // Create a canvas
    createCanvas(1200, 780)

    // Draw walls
    colliders.push(new Collider(0, 0, width, 0))
    colliders.push(new Collider(width, 0, width, height))
    colliders.push(new Collider(width, height, 0, height))
    colliders.push(new Collider(0, height, 0, 0))

    // Draw objects
    colliders.push(new Collider(150, 50, width - 50, 250))
    colliders.push(new Collider(400, 200, 500, 450))

    // Create a new Emitter
    emitter = new Emitter(360, 0.1)

    // Create inputs
    resolutionSlider = createSlider(0.1, 2, 2, 0.02);

    button = createButton('Ultra Overclock RTX 9000 Mode of Doom');
    button.mousePressed(() => {
        emitter.setResolution(10)
    });
}

function draw() {
    // Set the background to blackddd
    background(0)

    // Set resolution
    let sliderVal = resolutionSlider.value()
    if (lastResolutionVal !== sliderVal) {
        lastResolutionVal = sliderVal
        emitter.setResolution(sliderVal)
    }

    // Translate the emitter to the mous position
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