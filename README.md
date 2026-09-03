# Guess Game

A small browser-based number guessing game built with HTML, CSS, and JavaScript.

## How it works

- The game chooses a number from 1 to 100.
- Enter guesses and receive feedback on whether the guess is too high or too low.
- The game tracks attempts and previous guesses.
- Game state is stored in the browser's `localStorage` so a refresh can preserve progress.
- Use the reset control to start a new game.

## Run locally

Open `index.html` in a modern web browser. No build tools or external dependencies are required.

## Project structure

- `index.html` — page structure
- `style.css` — presentation and layout
- `script.js` — game logic and browser storage

## Learning purpose

This project is a JavaScript practice exercise covering DOM interaction, conditionals, random numbers, arrays, event handling, and `localStorage`.

> Note: `localStorage` is appropriate for this learning project, but it is not a secure place to store secrets or authoritative game data.
