var WIDTH = 40;
var HEIGHT = 22;
var GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;
// Constant 'b' for the logarithmic spiral equation r = a * e^(b * theta)
var SPIRAL_CONST_B = Math.log(GOLDEN_RATIO) / (Math.PI / 2);
// Constant 'a', a scaling factor for the spiral's size
var SPIRAL_CONST_A = 1.2;
// --- 2. Define a Canvas (ES5 compatible) ---
// Create a 2D array (grid) filled with space characters using traditional loops.
var canvas = [];
for (var i = 0; i < HEIGHT; i++) {
    var row = [];
    for (var j = 0; j < WIDTH; j++) {
        row.push(" ");
    }
    canvas.push(row);
}
// --- 3. Loop through the Angle (theta) ---
// We iterate through angles to draw the spiral point by point.
var theta = 0.0;
while (theta < 6 * Math.PI) {
    // Calculate the radius for the current angle using the spiral formula.
    var radius = SPIRAL_CONST_A * Math.exp(SPIRAL_CONST_B * theta);
    // Convert from polar coordinates (radius, theta) to Cartesian coordinates (x, y).
    var x = radius * Math.cos(theta);
    // Y is negated to flip the spiral vertically for the desired orientation.
    var y = -radius * Math.sin(theta);
    // Convert the mathematical coordinates to screen coordinates.
    // X is scaled by 2 for better aspect ratio in text consoles.
    // The coordinates are translated to have the origin (0,0) at the center of the canvas.
    var screenX_1 = Math.floor(x * 2 + WIDTH / 2);
    var screenY_1 = Math.floor(y + HEIGHT / 2);
    // --- 4. Draw on the Canvas ---
    // If the calculated screen coordinates are within the canvas bounds,
    // place a '$' character to represent a point on the spiral.
    if (screenX_1 >= 0 && screenX_1 < WIDTH && screenY_1 >= 0 && screenY_1 < HEIGHT) {
        canvas[screenY_1][screenX_1] = "$";
    }
    // Increment the angle for the next point. A smaller step makes a smoother spiral.
    theta += 0.02;
}
// Place a special character at the center of the spiral.
canvas[Math.floor(HEIGHT / 2)][Math.floor(WIDTH / 2)] = "@";
// --- 5. Print the Canvas (ES5 compatible) ---
// The output is formatted to match the original Python script's message.
console.log("\n--- Happy Birthday Debian!! ---");
// The canvas is iterated in reverse, and each row is also reversed
// to orient the spiral correctly for display.
var reversedCanvas = canvas.slice().reverse();
for (var i = 0; i < reversedCanvas.length; i++) {
    var row = reversedCanvas[i];
    console.log(row.slice().reverse().join(""));
}
console.log("\n         Debian              ");
console.log("------------------------------------------ \n");
