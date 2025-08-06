public class HBD_Debian {

    public static void main(String[] args) {
        // --- 1. Set Constants ---
        final int WIDTH = 40;
        final int HEIGHT = 22;
        final double GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;
        final double SPIRAL_CONST_B = Math.log(GOLDEN_RATIO) / (Math.PI / 2);
        final double SPIRAL_CONST_A = 1.2;

        // --- 2. Define a Canvas ---
        char[][] canvas = new char[HEIGHT][WIDTH];
        for (int i = 0; i < HEIGHT; i++) {
            for (int j = 0; j < WIDTH; j++) {
                canvas[i][j] = ' ';
            }
        }

        // --- 3. Loop through the Angle (theta) ---
        double theta = 0.0;
        while (theta < 6 * Math.PI) {
            // Calculate radius based on the logarithmic spiral formula
            double radius = SPIRAL_CONST_A * Math.exp(SPIRAL_CONST_B * theta);

            // Convert polar coordinates (radius, theta) to Cartesian coordinates (x, y)
            double x = radius * Math.cos(theta);
            double y = -radius * Math.sin(theta); // Negative to flip the y-axis for screen coordinates

            // Scale and translate to screen coordinates
            int screenX = (int) (x * 2 + WIDTH / 2.0);
            int screenY = (int) (y + HEIGHT / 2.0);

            // Draw the character if it's within the canvas bounds
            if (screenX >= 0 && screenX < WIDTH && screenY >= 0 && screenY < HEIGHT) {
                canvas[screenY][screenX] = '$';
            }

            theta += 0.02;
        }

        // Place the center character
        canvas[HEIGHT / 2][WIDTH / 2] = '@';

        // --- 7. Print the Canvas ---
        System.out.println("\n--- Happy Birthday Debian!! ---");
        // Iterate through the canvas rows in reverse to print correctly
        for (int i = HEIGHT - 1; i >= 0; i--) {
            StringBuilder rowString = new StringBuilder();
            // Iterate through the columns in reverse to mirror the output
            for (int j = WIDTH - 1; j >= 0; j--) {
                rowString.append(canvas[i][j]);
            }
            System.out.println(rowString.toString());
        }
        System.out.println("\n         Debian                  ");
        System.out.println("------------------------------------------- \n");
    }
}
