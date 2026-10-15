# Controls

Click the page once first, so the keyboard works.

| Key | Action |
|---|---|
| `F` | Fullscreen on/off |
| `M` | Mirror on/off. On by default, because the image is read from outside. Saved. |
| `P` | Pause / resume |
| `N` or `→` | Next scene |
| `B` or `←` | Previous scene |
| `Page Down` / `Page Up` | Next / previous scene. These are what a Logitech R400 clicker's right / left buttons send. |
| `F5` | Pause / resume (the R400's start button), so it can't reload the page mid-show |
| `1` `2` `3` `4` `5` | Jump to the start of Act I / II / III / IV / V |
| `D` | Debug overlay: act, scene, time in scene, position in the loop, fps |
| `H` | Help overlay |
| `C` | Calibration mode on/off |

## Calibration mode (`C`)

Shows an outline, diagonals and label on each pane, so you can line them up with the glass.

| Key | Action |
|---|---|
| `1` `2` `3` `4` | Pick the pane: UL, UR, LL, LR. Yellow = selected. |
| Arrows | Move the selected pane, 2 px per press. Directions follow what you see on screen, even when mirrored. |
| `Shift` + arrows | Resize the selected pane: left/right = width, up/down = height |
| `R` | Reset the selected pane |
| `C` | Leave calibration mode and save |

There is no keystone correction. Use the projector's own keystone for that.

## Saving

Calibration and the mirror setting are stored in the browser (localStorage) and are reloaded on every start. They are kept per browser profile and per page address. They are lost if you clear site data or use a private window, or if you open the page in a different browser or from a different path or address.

## URL options

Add to the end of the address, for example `index.html?s=12&t=30&pause=1`.

| Option | Meaning |
|---|---|
| `s=N` | Start at scene N, counting from 0 |
| `t=SECONDS` | Start this many seconds into that scene |
| `pause=1` | Start paused |
| `mirror=0` | Start unmirrored |
| `date=2026-10-20` | Pretend today is this date, for the countdown |
| `dbg=1` / `cal=1` | Start with the debug overlay / calibration mode on |
| `still=1` | Draw one frame and stop |
| `gl=0.5` | Act V (WebGL) internal resolution, 0.2–1 (default 0.6). Setting it turns off the automatic slow-laptop downscaling. |

## Kiosk launch (macOS)

```
open -a "Google Chrome" --args --kiosk "file:///Volumes/Coding-Environment/Claude/Halloween%20window/index.html"
```
