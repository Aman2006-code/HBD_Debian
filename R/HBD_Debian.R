# --- 1. Set Constants ---
WIDTH <- 40
HEIGHT <- 22
GOLDEN_RATIO <- (1 + sqrt(5)) / 2
# In R, pi is a built-in constant
SPIRAL_CONST_B <- log(GOLDEN_RATIO) / (pi / 2)
SPIRAL_CONST_A <- 1.2

# --- 2. Define a Canvas ---
# R uses matrices. We create a character matrix filled with spaces.
canvas <- matrix(' ', nrow = HEIGHT, ncol = WIDTH)

# --- 3. Loop through the Angle (theta) ---
theta <- 0.0
while (theta < 6 * pi) {
    radius <- SPIRAL_CONST_A * exp(SPIRAL_CONST_B * theta)
    x <- radius * cos(theta)
    y <- -radius * sin(theta)

    # Convert mathematical coordinates to screen coordinates.
    # as.integer() is R's equivalent of Python's int() for truncation.
    # CRITICAL: R uses 1-based indexing, so we add 1 to the final index.
    screen_x <- as.integer(x * 2 + WIDTH / 2) + 1
    screen_y <- as.integer(y + HEIGHT / 2) + 1

    # Check if the coordinates are within the canvas bounds.
    if (screen_x >= 1 && screen_x <= WIDTH && screen_y >= 1 && screen_y <= HEIGHT) {
        # R indexing is [row, column]
        canvas[screen_y, screen_x] <- '$'
    }

    theta <- theta + 0.02
}

# Place the '@' at the center, remembering to use 1-based indexing.
canvas[as.integer(HEIGHT / 2) + 1, as.integer(WIDTH / 2) + 1] <- '@'

# --- 7. Print the Canvas ---
# cat() is used for printing formatted strings.
cat("\n--- Happy Birthday Debian!! ---\n")

# To replicate the Python output, we must iterate through rows from bottom to top
# and reverse each row before printing.
# seq() creates the reverse sequence of row indices.
for (i in seq(from = HEIGHT, to = 1, by = -1)) {
    # Get the i-th row from the matrix
    row <- canvas[i, ]
    # Reverse the elements in the row vector (same as Python's [::-1])
    reversed_row <- rev(row)
    # Collapse the vector into a single string and print it with a newline
    cat(paste0(reversed_row, collapse = ""), "\n")
}

cat("\n         Debian              \n")
cat("------------------------------------------- \n\n")