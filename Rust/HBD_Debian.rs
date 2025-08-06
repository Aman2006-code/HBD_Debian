use std::f64::consts::PI;

fn main() {
    // --- 1. Set Constants & Variables ---
    // Define the dimensions of the canvas. These can be `const` as they are literals.
    const WIDTH: usize = 40;
    const HEIGHT: usize = 22;
    const SPIRAL_CONST_A: f64 = 1.2;

    // These values must be calculated at runtime, so we use `let` instead of `const`.
    // The `sqrt` and `ln` functions are not `const fn` and cannot be evaluated at compile time.
    let golden_ratio: f64 = (1.0 + 5.0_f64.sqrt()) / 2.0;
    let spiral_const_b: f64 = golden_ratio.ln() / (PI / 2.0);

    // --- 2. Define a Canvas ---
    // Create a 2D vector (a vector of vectors) to act as the character grid.
    // It's initialized with space characters, just like the Python version.
    let mut canvas = vec![vec![' '; WIDTH]; HEIGHT];

    // --- 3. Loop through the Angle (theta) ---
    // Loop from 0 up to 6*PI to draw a multi-turn spiral.
    let mut theta = 0.0;
    while theta < 6.0 * PI {
        // Calculate the radius for the current angle using the logarithmic spiral formula.
        let radius = SPIRAL_CONST_A * (spiral_const_b * theta).exp();

        // Convert polar coordinates (radius, theta) to Cartesian coordinates (x, y).
        let x = radius * theta.cos();
        // The y-axis is inverted to match typical screen coordinate systems (y increases downwards).
        let y = -radius * theta.sin();

        // Scale and translate the Cartesian coordinates to fit onto the canvas.
        // We cast to `isize` first to handle potential negative coordinates before the bounds check.
        let screen_x = (x * 2.0 + (WIDTH as f64) / 2.0) as isize;
        let screen_y = (y + (HEIGHT as f64) / 2.0) as isize;

        // --- 4. Draw on Canvas ---
        // Check if the calculated screen coordinates are within the canvas bounds.
        if screen_x >= 0 && screen_x < WIDTH as isize && screen_y >= 0 && screen_y < HEIGHT as isize
        {
            // If they are, place the '$' character. We must cast back to `usize` for indexing.
            canvas[screen_y as usize][screen_x as usize] = '$';
        }

        // Increment the angle for the next point.
        theta += 0.02;
    }

    // Place the '@' character at the center of the spiral.
    canvas[HEIGHT / 2][WIDTH / 2] = '@';

    // --- 5. Print the Canvas ---
    println!("\n--- Happy Birthday Debian!! ---");

    // Iterate through the canvas's rows in reverse order to print from bottom to top.
    for row in canvas.iter().rev() {
        // For each row, create a new reversed string and print it.
        // This correctly orients the spiral as it was in the original script.
        let reversed_row: String = row.iter().rev().collect();
        println!("{}", reversed_row);
    }

    println!("\n         Debian              ");
    println!("------------------------------------------- \n");
}
