# Board widgets

Fifteen small single-file web tools, originally built as embeds on a Claude whiteboard:

| Time | Group | Random | Games |
|---|---|---|---|
| Counter | Shared to-do list | Dice roller | Rock paper scissors |
| Timer | Shared notes | Coin flip | |
| Stopwatch | Scoreboard | Random picker | |
| Pomodoro | Quick poll | Spinning wheel | |
| | Mood check-in | Team shuffler | |

## Run

No build step. Open `index.html` to see them all on one page, or any file in `widgets/` on its own.
Live on GitHub Pages: https://eitanai-git.github.io/board-widgets/ (laid out like the whiteboard).

## How state works

On the whiteboard, widgets saved through the board's `appifactEmbed` API so everyone shared the same state.
Here, `shim.js` provides the same API backed by `localStorage`, so each widget remembers its state per browser
and syncs across tabs. To share state between people you'd swap the shim for a real backend.
