package main

import (
	"fmt"
	"math"
)

func main() {
	// --- 1. Set Constants ---
	// Define the dimensions and mathematical constants for the spiral.
	const WIDTH = 40
	const HEIGHT = 22
	const SPIRAL_CONST_A = 1.2

	// These values are calculated at runtime, so they must be variables (`var`), not constants (`const`).
	var GOLDEN_RATIO = (1 + math.Sqrt(5)) / 2
	var SPIRAL_CONST_B = math.Log(GOLDEN_RATIO) / (math.Pi / 2)


	// --- 2. Define a Canvas ---
	// Create a 2D slice of runes (Go's equivalent for characters)
	// and initialize it with space characters.
	canvas := make([][]rune, HEIGHT)
	for i := range canvas {
		canvas[i] = make([]rune, WIDTH)
		for j := range canvas[i] {
			canvas[i][j] = ' '
		}
	}

	// --- 3. Loop through the Angle (theta) ---
	// Go uses a `for` loop to replicate the behavior of a `while` loop.
	theta := 0.0
	for theta < 6*math.Pi {
		// Calculate the polar coordinates of the spiral.
		radius := SPIRAL_CONST_A * math.Exp(SPIRAL_CONST_B*theta)
		x := radius * math.Cos(theta)
		y := -radius * math.Sin(theta)

		// Convert spiral coordinates to screen coordinates.
		// We must explicitly cast the float64 results to int for slice indexing.
		screenX := int(x*2 + WIDTH/2)
		screenY := int(y + HEIGHT/2)

		// Check if the coordinates are within the canvas bounds before drawing.
		if screenX >= 0 && screenX < WIDTH && screenY >= 0 && screenY < HEIGHT {
			canvas[screenY][screenX] = '$'
		}

		// Increment the angle.
		theta += 0.02
	}

	// Place the '@' symbol at the center of the spiral.
	canvas[HEIGHT/2][WIDTH/2] = '@'

	// --- 7. Print the Canvas ---
	fmt.Println("\n--- Happy Birthday Debian!! ---")
	// To match the Python output, we iterate through the rows in reverse order (from HEIGHT-1 down to 0).
	for i := HEIGHT - 1; i >= 0; i-- {
		row := canvas[i]
		reversedRow := make([]rune, WIDTH)
		// We also reverse the characters in each row (from WIDTH-1 down to 0).
		for j := WIDTH - 1; j >= 0; j-- {
			reversedRow[WIDTH-1-j] = row[j]
		}
		// Print the fully reversed row as a string.
		fmt.Println(string(reversedRow))
	}
	fmt.Println("\n         Debian                  ")
	fmt.Println("------------------------------------------- \n")
}
