;;; This script generates a text-based representation of the Debian logo's swirl.
;;; It's a direct translation of the provided Python script into Common Lisp.

;;; --- 1. Set Constants ---
;;; Define global parameters for the canvas dimensions and spiral calculation.
;;; The *earmuffs* are a convention for naming special (global) variables.
(defparameter *width* 40
  "The width of the canvas in characters.")
(defparameter *height* 22
  "The height of the canvas in characters.")
(defparameter *golden-ratio* (/ (+ 1 (sqrt 5)) 2.0)
  "The golden ratio constant, used for the spiral's proportions.")
(defparameter *spiral-const-b* (/ (log *golden-ratio*) (/ pi 2.0))
  "The 'b' constant for the logarithmic spiral equation, controlling its tightness.")
(defparameter *spiral-const-a* 1.2
  "The 'a' constant for the logarithmic spiral equation, controlling its starting radius.")


(defun draw-debian-spiral ()
  "Creates and prints a textual representation of the Debian logo spiral."

  ;; --- 2. Define a Canvas ---
  ;;; Create a 2D array to represent the character grid.
  ;;; It's initialized with space characters.
  (let ((canvas (make-array (list *height* *width*) :initial-element #\Space)))

    ;; --- 3. Loop through the Angle (theta) to Draw the Spiral ---
    ;;; The 'loop' macro provides a powerful way to iterate.
    ;;; We increment theta from 0 up to 6*pi with a small step.
    (loop for theta from 0.0 by 0.02
          while (< theta (* 6 pi))
          do (let* (;; Calculate polar coordinates for the spiral
                    (radius (* *spiral-const-a* (exp (* *spiral-const-b* theta))))
                    ;; Convert polar to Cartesian coordinates
                    (x (* radius (cos theta)))
                    (y (- (* radius (sin theta)))) ; Negate y to flip the spiral vertically
                    ;; Translate and scale Cartesian coordinates to fit the canvas grid
                    (screen-x (round (+ (* x 2) (/ *width* 2))))
                    (screen-y (round (+ y (/ *height* 2)))))

               ;; Check if the calculated point is within the canvas bounds before drawing
               (when (and (<= 0 screen-x (1- *width*))
                          (<= 0 screen-y (1- *height*)))
                 ;; If it is, place a '$' character at that position.
                 ;; 'setf' is used to modify the value at a specific place (here, an array index).
                 (setf (aref canvas screen-y screen-x) #\$))))

    ;; Place the '@' character at the center of the canvas
    (setf (aref canvas (round (/ *height* 2)) (round (/ *width* 2))) #\@)

    ;; --- 7. Print the Canvas ---
    (format t "~%--- Happy Birthday Debian!! ---~%")

    ;; To match the Python output (reversed rows and reversed characters in each row),
    ;; we iterate through the rows from bottom-to-top and columns from right-to-left.
    (loop for y from (1- *height*) downto 0
          do (progn
               (loop for x from (1- *width*) downto 0
                     do (write-char (aref canvas y x)))
               (terpri))) ; 'terpri' prints a newline character

    (format t "~%         Debian             ~%")
    (format t "------------------------------------------- ~%~%")))

;; --- Execute the main function ---
;;; This call will run the function and print the spiral to the standard output.
(draw-debian-spiral)
