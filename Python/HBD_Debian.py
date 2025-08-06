import math

# --- 1. Set Constants ---
WIDTH = 40
HEIGHT = 22
GOLDEN_RATIO = (1 + math.sqrt(5)) / 2
SPIRAL_CONST_B = math.log(GOLDEN_RATIO) / (math.pi / 2)
SPIRAL_CONST_A = 1.2

# --- 2. Define a Canvas ---
canvas = [[' ' for _ in range(WIDTH)] for _ in range(HEIGHT)]

# --- 3. Loop through the Angle (theta) ---
theta = 0.0
while theta < 6 * math.pi:
    radius = SPIRAL_CONST_A * math.exp(SPIRAL_CONST_B * theta)
    x = radius * math.cos(theta)
    y = -radius * math.sin(theta)
    screen_x = int(x * 2 + WIDTH / 2)
    screen_y = int(y + HEIGHT / 2)
    if 0 <= screen_x < WIDTH and 0 <= screen_y < HEIGHT:
        canvas[screen_y][screen_x] = '$'
    theta += 0.02

canvas[int(HEIGHT / 2)][int(WIDTH / 2)] = '@'

# --- 7. Print the Canvas ---
print("\n--- Happy Birthday Debian!! ---")
for row in reversed(canvas):
    print("".join(row[::-1]))
print("\n         Debian              ")
print("------------------------------------------- \n")
