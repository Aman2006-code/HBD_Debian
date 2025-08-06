const WIDTH: number = 40;
const HEIGHT: number = 22;
const GOLDEN_RATIO: number = (1 + Math.sqrt(5)) / 2;
// Constant 'b' for the logarithmic spiral equation r = a * e^(b * theta)
const SPIRAL_CONST_B: number = Math.log(GOLDEN_RATIO) / (Math.PI / 2);
// Constant 'a', a scaling factor for the spiral's size
const SPIRAL_CONST_A: number = 1.2;

// --- 2. Define a Canvas (ES5 compatible) ---
// Create a 2D array (grid) filled with space characters using traditional loops.
const canvas: string[][] = [];
for (let i = 0; i < HEIGHT; i++) {
  const row: string[] = [];
  for (let j = 0; j < WIDTH; j++) {
    row.push(" ");
  }
  canvas.push(row);
}

// --- 3. Loop through the Angle (theta) ---
// We iterate through angles to draw the spiral point by point.
let theta: number = 0.0;
while (theta < 6 * Math.PI) {
  // Calculate the radius for the current angle using the spiral formula.
  const radius: number = SPIRAL_CONST_A * Math.exp(SPIRAL_CONST_B * theta);

  // Convert from polar coordinates (radius, theta) to Cartesian coordinates (x, y).
  const x: number = radius * Math.cos(theta);
  // Y is negated to flip the spiral vertically for the desired orientation.
  const y: number = -radius * Math.sin(theta);

  // Convert the mathematical coordinates to screen coordinates.
  // X is scaled by 2 for better aspect ratio in text consoles.
  // The coordinates are translated to have the origin (0,0) at the center of the canvas.
  const screenX: number = Math.floor(x * 2 + WIDTH / 2);
  const screenY: number = Math.floor(y + HEIGHT / 2);

  // --- 4. Draw on the Canvas ---
  // If the calculated screen coordinates are within the canvas bounds,
  // place a '$' character to represent a point on the spiral.
  if (screenX >= 0 && screenX < WIDTH && screenY >= 0 && screenY < HEIGHT) {
    canvas[screenY][screenX] = "$";
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
const reversedCanvas = canvas.slice().reverse();
for (let i = 0; i < reversedCanvas.length; i++) {
  const row = reversedCanvas[i];
  console.log(row.slice().reverse().join(""));
}
console.log("\n         Debian              ");
console.log("------------------------------------------ \n");
