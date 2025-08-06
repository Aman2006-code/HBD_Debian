import kotlin.math.cos
import kotlin.math.exp
import kotlin.math.ln
import kotlin.math.PI
import kotlin.math.sin
import kotlin.math.sqrt

// --- 1. Set Constants ---
// 'const val' is used for compile-time constants.
const val WIDTH = 40
const val HEIGHT = 22
const val SPIRAL_CONST_A = 1.2

// These are calculated at runtime, so they are 'val' not 'const val'.
val GOLDEN_RATIO = (1 + sqrt(5.0)) / 2
val SPIRAL_CONST_B = ln(GOLDEN_RATIO) / (PI / 2)

fun main() {
    // --- 2. Define a Canvas ---
    val canvas = MutableList(HEIGHT) { MutableList(WIDTH) { ' ' } }

    // --- 3. Loop through the Angle (theta) ---
    var theta = 0.0
    while (theta < 6 * PI) {
        val radius = SPIRAL_CONST_A * exp(SPIRAL_CONST_B * theta)
        val x = radius * cos(theta)
        val y = -radius * sin(theta)

        // Convert mathematical coordinates to screen coordinates
        val screenX = (x * 2 + WIDTH / 2).toInt()
        val screenY = (y + HEIGHT / 2).toInt()

        // Draw the spiral character if it's within the canvas bounds
        if (screenX in 0 until WIDTH && screenY in 0 until HEIGHT) {
            canvas[screenY][screenX] = '$'
        }
        theta += 0.02
    }

    // Place the center character
    canvas[HEIGHT / 2][WIDTH / 2] = '@'

    // --- 4. Print the Canvas ---
    println("\n--- Happy Birthday Debian!! ---")
    // Iterate through the canvas rows in reverse to print correctly
    for (row in canvas.reversed()) {
        // Reverse each row and join to a string to match the original output
        println(row.joinToString("").reversed())
    }
    println("\n         Debian              ")
    println("-------------------------------------------\n")
}
