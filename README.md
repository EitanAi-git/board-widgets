# Board widgets

Twenty-one small single-file web tools, originally built as embeds on a Claude whiteboard:

| Time | Group | Random | Games | Tools |
|---|---|---|---|---|
| Counter | Scoreboard | Dice roller | Rock paper scissors | Habit tracker |
| Timer | Quick poll | Coin flip | Chess clock | Decibel meter |
| Stopwatch | Shared notes | Random picker | Tally for two | |
| Pomodoro | Shared to-do list | Spinning wheel | Reaction test | |
| Metronome | Team shuffler, Mood check-in | | | |

Tap any widget to open its details page: a bigger live version, tips, actions and settings
(counter step, timer alarm, poll options, Pomodoro lengths, chess clock time, metronome beats, habit goal).

## Run

No build step. Open `index.html` to see them all on one page, or any file in `widgets/` on its own.
Live on GitHub Pages: https://eitanai-git.github.io/board-widgets/ (laid out like the whiteboard). Installable as an app: open it in Chrome → ⋮ → Install app. Works offline.

## How state works

On the whiteboard, widgets saved through the board's `appifactEmbed` API so everyone shared the same state.
Here, `shim.js` provides the same API (plus `settings()` for the details-page settings), backed by `localStorage`, so each widget remembers its state per browser
and syncs across tabs. To share state between people you'd swap the shim for a real backend.
