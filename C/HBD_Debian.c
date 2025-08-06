#include <stdio.h>
#include <math.h>

/*
 * To compile and run this code:
 * 1. Save it as a file, for example, 'debian_spiral.c'.
 * 2. Open your terminal.
 * 3. Compile it using a C compiler like GCC:
 * gcc debian_spiral.c -o debian_spiral -lm
 * (The '-lm' flag is important to link the math library)
 * 4. Run the compiled program:
 * ./debian_spiral
 */

// --- 1. Set Constants ---
#define WIDTH 40
#define HEIGHT 22

int main() {
    // Mathematical constants for the spiral calculation
    const double GOLDEN_RATIO = (1.0 + sqrt(5.0)) / 2.0;
    const double SPIRAL_CONST_B = log(GOLDEN_RATIO) / (M_PI / 2.0);
    const double SPIRAL_CONST_A = 1.2;

    // --- 2. Define a Canvas ---
    // A 2D array to hold the characters for our drawing
    char canvas[HEIGHT][WIDTH];

    // Initialize the entire canvas with space characters
    for (int i = 0; i < HEIGHT; i++) {
        for (int j = 0; j < WIDTH; j++) {
            canvas[i][j] = ' ';
        }
    }

    // --- 3. Loop through the Angle (theta) ---
    double theta = 0.0;
    while (theta < 6.0 * M_PI) {
        // Calculate the radius for the current angle (theta)
        double radius = SPIRAL_CONST_A * exp(SPIRAL_CONST_B * theta);

        // Convert from polar coordinates (radius, theta) to Cartesian coordinates (x, y)
        double x = radius * cos(theta);
        double y = -radius * sin(theta); // Negative to flip the spiral vertically

        // Convert the mathematical coordinates to screen coordinates
        // Scale x by 2 for better aspect ratio and center it
        int screen_x = (int)(x * 2.0 + WIDTH / 2.0);
        // Center y
        int screen_y = (int)(y + HEIGHT / 2.0);

        // If the calculated point is within the canvas bounds, draw a '$'
        if (screen_x >= 0 && screen_x < WIDTH && screen_y >= 0 && screen_y < HEIGHT) {
            canvas[screen_y][screen_x] = '$';
        }

        // Increment the angle for the next point
        theta += 0.02;
    }

    // Place the '@' symbol at the center of the spiral
    canvas[HEIGHT / 2][WIDTH / 2] = '@';

    // --- 7. Print the Canvas ---
    printf("\n--- Happy Birthday Debian!! ---\n");

    for (int i = HEIGHT - 1; i >= 0; i--) {
        for (int j = WIDTH - 1; j >= 0; j--) {
            putchar(canvas[i][j]);
        }
        putchar('\n');
    }

    printf("\n         Debian              \n");
    printf("-------------------------------------------\n\n");

    return 0;
}
