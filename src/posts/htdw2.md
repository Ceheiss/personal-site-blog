---
title: HtDW. Compound Data and Pacman Program
date: "2022-03-21"
---

For this week on the *How to Code Simple Data* course I learned about compound data, which is some way to group information that belongs together, that can't be done with simple atomic data.

Examples of when we would like to do this, are muultiple. Think of an employee when we need to dave first,  lastname, and salary. Or the position of an object using x, y coordinates.

In Racket, we will start with a mechanism called **define-struct** that will enable us to create compound values. This is the lisp way of building what in JS are objects, or in Python Dictionaries (key/value pairs).

So how do we do it? We are able to create compound data using the “define-struct” primitive. Here is how we use it:

*(define-struct position (x y))*           → definition (x and y are the “field” names)
*(make-position 3 6)*                      → constructor
*(define P1 (make-position 3 6))*          → saved on a constant
*(position-x P1)*                          → is a selector. Returns 3
*(position-y P1)*                          → is a selector. Returns 6
*(position? P1)*                           → is a predicate. Returns true
*(position? “coolio”)*                     → is a predicate. Returns false

So it looks kind of silly, I'll admit, but in the end we use *define-struct* as a primitive, first argument is the name of this "dictionary" and in parenthesis we add the keys of the dictionary.

Constructor is *make-<name-of-struct>* and we pass the values in the same order as the keys. 
  
Finally, to read the values, we use *<name-of-struct>-<key> <instance-of-struct>*. That's it.
  
### Creating a program
  
As a challenge, we had to create a program that uses compound data. I created a pacman prototype (just moving pacman around, making the face close and open constantly as in the game, and also the face facing the right direction all the time).
  
I will just dump the whole program and write a bit about it bellow:  
  
```lisp
(require 2htdp/image)
(require 2htdp/universe)

;; =================
;; Constants:

(define WIDTH 800)
(define HEIGHT 400)
(define SPEED 12)

(define PACMAN-CLOSED-RIGHT <insert pacman image literal>)
(define PACMAN-OPEN-RIGHT <insert pacman image literal>)

(define PACMAN-CLOSED-UP (rotate 90 PACMAN-CLOSED-RIGHT))
(define PACMAN-OPEN-UP (rotate 90 PACMAN-OPEN-RIGHT))

(define PACMAN-CLOSED-DOWN (rotate 270 PACMAN-CLOSED-RIGHT))
(define PACMAN-OPEN-DOWN (rotate 270 PACMAN-OPEN-RIGHT))

(define PACMAN-CLOSED-LEFT (flip-horizontal PACMAN-CLOSED-RIGHT))
(define PACMAN-OPEN-LEFT (flip-horizontal PACMAN-OPEN-RIGHT))

(define MTS (empty-scene WIDTH HEIGHT))

;; =================
;; Data definitions:

(define-struct pacman (x y open? direction))
;; Pacman is (make-pacman Integer Integer Boolean String)
;; interp. (make-pacman x y) is a pacman with x coordinate x, y coordinate y.
;; the x and y are the center of the pacman
;; x and y are in screen coordinates (pixels)
;; open? is if pacman has mouth open
;; direction is either "up", "down", "right", "left"

(define P1 (make-pacman 1 1 true "right")) ; Pacman on upper-left corner of the screen, open mouth, facing right
(define P2 (make-pacman (/ WIDTH 2) (/ HEIGHT 2) false "left")) ; Pacman on the middle of the screen, closed mouth, facing left

;; ===========
;; Functions

;; Pacman -> Pacman
;; run the program. Control Pacman with key-events.
;; Start with (main (make-pacman 0 0 true "right"))
;; <no tests for main functions>

(define (main p)
        (big-bang p
        (to-draw render-pacman)
        (on-key move-pacman)))

;; Pacman-> Image
;; interp. Render pacman in the correct position, state, and direction.

;; (define (render-pacman p) PACMAN-CLOSED) ; stub

(check-expect (render-pacman (make-pacman 1 1 true "right")) (place-image PACMAN-OPEN-RIGHT 1 1 MTS))
(check-expect (render-pacman (make-pacman 20 20 false "left")) (place-image PACMAN-CLOSED-LEFT 20 20 MTS))

;; <Template from Pacman>

(define (render-pacman p)
        (place-image
        (pacman-image p) (pacman-x p) (pacman-y p) MTS))

;; Pacman -> Image
;; interp. selects the appropiate pacman image based on open? and direction

;; (define (pacman-image p) PACMAN-OPEN-RIGHT)

(check-expect (pacman-image (make-pacman 0 0 true "right")) PACMAN-OPEN-RIGHT)
(check-expect (pacman-image (make-pacman 0 0 false "right")) PACMAN-CLOSED-RIGHT)
(check-expect (pacman-image (make-pacman 0 0 true "left")) PACMAN-OPEN-LEFT)
(check-expect (pacman-image (make-pacman 0 0 false "left")) PACMAN-CLOSED-LEFT)
(check-expect (pacman-image (make-pacman 0 0 true "up")) PACMAN-OPEN-UP)
(check-expect (pacman-image (make-pacman 0 0 false "up")) PACMAN-CLOSED-UP)
(check-expect (pacman-image (make-pacman 0 0 true "down")) PACMAN-OPEN-DOWN)
(check-expect (pacman-image (make-pacman 0 0 false "down")) PACMAN-CLOSED-DOWN)

;; <Template from Pacman>

(define (pacman-image p)
(cond [(and (boolean=? (pacman-open? p) true) (string=? (pacman-direction p) "right")) PACMAN-OPEN-RIGHT]
      [(and (boolean=? (pacman-open? p) true) (string=? (pacman-direction p) "left")) PACMAN-OPEN-LEFT]
      [(and (boolean=? (pacman-open? p) true) (string=? (pacman-direction p) "up")) PACMAN-OPEN-UP]
      [(and (boolean=? (pacman-open? p) true) (string=? (pacman-direction p) "down")) PACMAN-OPEN-DOWN]
      [(and (boolean=? (pacman-open? p) false) (string=? (pacman-direction p) "right")) PACMAN-CLOSED-RIGHT]
      [(and (boolean=? (pacman-open? p) false) (string=? (pacman-direction p) "left")) PACMAN-CLOSED-LEFT]
      [(and (boolean=? (pacman-open? p) false) (string=? (pacman-direction p) "up")) PACMAN-CLOSED-UP]
      [(and (boolean=? (pacman-open? p) false) (string=? (pacman-direction p) "down")) PACMAN-CLOSED-DOWN]
      [else PACMAN-OPEN-RIGHT]))

;; Pacman -> Pacman
;; interp. up-arrow moves pacman up, down-arrow down, right-arrow right and left-arrow left.

;; (define (move-pacman p ke) (make-pacman 1 1)) ; stub

(check-expect (move-pacman (make-pacman 0 0 true "right") "right") (make-pacman SPEED 0 false "right"));
(check-expect (move-pacman (make-pacman SPEED 0 true "right") "left") (make-pacman 0 0 false "left"));
(check-expect (move-pacman (make-pacman 0 SPEED true "right") "up") (make-pacman 0 0 false "up"));
(check-expect (move-pacman (make-pacman 0 0 true "right") "down") (make-pacman 0 SPEED false "down"));
(check-expect (move-pacman (make-pacman 0 0 true "right") " ") (make-pacman 0 0 true "right"));

;; <Template from Pacman>

(define (move-pacman p key)
(cond [(key=? "right" key) (make-pacman (+ (pacman-x p) SPEED) (pacman-y p) (not (pacman-open? p)) "right")]
      [(key=? "left" key) (make-pacman (- (pacman-x p) SPEED) (pacman-y p) (not (pacman-open? p)) "left")]
      [(key=? "up" key) (make-pacman (pacman-x p) (- (pacman-y p) SPEED) (not (pacman-open? p)) "up")]
      [(key=? "down" key) (make-pacman (pacman-x p) (+ SPEED (pacman-y p)) (not (pacman-open? p)) "down")]
      [else p]))
```
 
So I used what I've learned for "How to Design Worlds" to define the constants at the beginning and setting up the images to be used in each case.
  
Later moved into the data definition. Pacman's state was position, if the mouth was open or not, and the direction it should be facing (** x y open? direction **), so it was a perfect opportunity for compoqund data.
  
In the functions, we have two main ones: *render-pacman* and *move-pacman*. In *render-pacman* we use a helper function called *pacman-image*, to decide which of the images of pacman (facing in different directions, and whether mouth is closed or not) based on pacman's state.
  
The second function is *move-pacman*, which is the one responding to the key events (arrow up, down, right and left).  *move-pacman* basically returns a new pacman state based on the key events. This exact pacman state is what later consumes *pacman-image* so that render-pacman can finally create the image of pacman in the correction screen coordinate, direction, and mouth state (is that even a tbesides the ones described for the big bang library  thing? lol)..
  
 The project was quite fun to code, and see the pacman live just moving around being an awesome ball shaped being. Anyhow, next week we get introduced to lists in Racket, until that!
