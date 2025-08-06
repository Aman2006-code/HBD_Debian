#include <iostream>
#include <vector>
#include <string>
#include <cmath>
#include <algorithm> // Required for std::reverse

int main() {
    // --- 1. Set Constants ---
    // Define the dimensions of the console canvas.
    const int WIDTH = 40;
    const int HEIGHT = 22;

    // Define mathematical constants for the spiral calculation.
    // M_PI is a common, non-standard macro for pi, available in <cmath>.
    const double GOLDEN_RATIO = (1.0 + std::sqrt(5.0)) / 2.0;
    const double SPIRAL_CONST_B = std::log(GOLDEN_RATIO) / (M_PI / 2.0);
    const double SPIRAL_CONST_A = 1.2;

    // --- 2. Define a Canvas ---
    // Create a 2D vector of characters, initialized with spaces.
    // This acts as our character buffer for drawing.
    std::vector<std::vector<char>> canvas(HEIGHT, std::vector<char>(WIDTH, ' '));

    // --- 3. Loop through the Angle (theta) ---
    // Iterate through angles to draw the spiral arms.
    double theta = 0.0;
    while (theta < 6.0 * M_PI) {
        // Calculate the radius for a logarithmic spiral.
        double radius = SPIRAL_CONST_A * std::exp(SPIRAL_CONST_B * theta);

        // Convert from polar coordinates (radius, theta) to Cartesian (x, y).
        double x = radius * std::cos(theta);
        double y = -radius * std::sin(theta); // Negative to flip y-axis for screen coordinates

        // Scale and translate the Cartesian coordinates to fit the canvas.
        int screen_x = static_cast<int>(x * 2.0 + WIDTH / 2.0);
        int screen_y = static_cast<int>(y + HEIGHT / 2.0);

        // If the calculated point is within the canvas bounds, draw a character.
        if (screen_x >= 0 && screen_x < WIDTH && screen_y >= 0 && screen_y < HEIGHT) {
            canvas[screen_y][screen_x] = '$';
        }

        // Increment the angle to draw the next point.
        theta += 0.02;
    }

    // Place a marker at the center of the spiral.
    canvas[HEIGHT / 2][WIDTH / 2] = '@';

    // --- 7. Print the Canvas ---
    std::cout << "\n--- Happy Birthday Debian!! ---" << std::endl;

    // Iterate through the canvas rows from bottom to top.
    for (int i = HEIGHT - 1; i >= 0; --i) {
        // Create a string from the character vector row.
        std::string row_str(canvas[i].begin(), canvas[i].end());
        // Reverse the string to match the Python output.
        std::reverse(row_str.begin(), row_str.end());
        // Print the reversed row.
        std::cout << row_str << std::endl;
    }

    std::cout << "\n           Debian              " << std::endl;
    std::cout << "------------------------------------------- \n" << std::endl;

    return 0;
}
