# 🌌 AirDrawer — Draw in the Air with Your Webcam

AirDrawer is a browser app that turns your webcam into a drawing tool. Point your hand at the camera, and your fingertip becomes a paintbrush — no mouse, no touchscreen, no extra hardware. It uses AI-based hand tracking (Google's MediaPipe) to read your hand gestures in real time.

You draw with one hand and move/resize/rotate what you've drawn with the other hand, all through gestures.

## ✨ What It Can Do

- **Draw** in mid-air by pointing your index finger at the camera
- **Erase** by pinching your thumb and index finger together
- **Clear** the whole canvas by making a fist
- **Move, scale, and rotate** any stroke using your other hand
- **Undo / redo** your drawing actions, including erases
- **Save** your drawing as a PNG image
- A clean, glowing neon UI with a built-in gesture guide

## 🧰 Before You Start

You'll need:
1. **[Node.js](https://nodejs.org/)** version 18 or newer installed on your computer
   - Check your version by running `node -v` in a terminal
2. **A webcam** (built-in laptop camera works fine)
3. **A modern browser** (Chrome or Edge recommended) — camera access is required

You do **not** need to know React or JavaScript to run this project — just follow the steps below.

## 🚀 Getting Started

1. **Download the project** (clone it or download the ZIP and extract it), then open a terminal inside the project folder.

2. **Install the dependencies** — this downloads everything the project needs to run:
   ```bash
   npm install
   ```

3. **Start the app**:
   ```bash
   npm run dev
   ```

4. Your terminal will print a local address, usually:
   ```
   http://localhost:5173/
   ```
   Open that link in your browser.

5. Your browser will ask for **camera permission** — click **Allow**. (This works over plain `http://localhost` because browsers treat `localhost` as a trusted, secure address.)

6. Raise your hand in front of the camera and start drawing!

## 🎮 How to Use It

### ✍️ Your drawing hand (the one MediaPipe detects first / your dominant hand)

| Gesture | What it does |
|---|---|
| ☝️ Point with your index finger | Draw a stroke |
| 🤏 Pinch thumb + index finger together | Erase nearby strokes |
| ✊ Make a fist | Clear the entire canvas |

### 🖐️ Your control hand (the other hand)

| Gesture | What it does | What you'll see |
|---|---|---|
| ✌️ Hold up two fingers | Move the nearest stroke | Blue crosshair |
| 🤏 Pinch, then spread or close your fingers | Scale (resize) the stroke | Rings + a % size label |
| 🤚 Open palm, then twist your wrist | Rotate the stroke | Orange arc + snap guide |

Tip: If you only use one hand, it's automatically treated as your drawing hand. Click the **Help** button (❓) inside the app any time for a quick reminder of these gestures.

## 🛠️ Other Useful Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the app for local development |
| `npm run build` | Build an optimized production version (output goes to the `dist/` folder) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Check the code for style/quality issues |

## 🩹 Troubleshooting

- **"Cannot find native binding" / Vite crashes on startup** — this usually means your Node.js version is too old. Update Node to the latest LTS version from [nodejs.org](https://nodejs.org/) and run `npm install` again.
- **Camera doesn't turn on / permission errors** — make sure you clicked "Allow" when your browser asked for camera access. If you accidentally blocked it, check your browser's site settings for `localhost` and re-enable the camera.
- **Hand tracking feels laggy or inaccurate** — make sure you're in a well-lit room and your hand is clearly visible and not too close/far from the camera.
- **Nothing happens when I move my hand** — check that "Gestures On" is enabled in the settings panel (top-right gear icon).

## 🧱 Tech Stack

- **Frontend**: React + Vite
- **Hand Tracking**: MediaPipe Hands (loaded via CDN)
- **Animations**: Framer Motion
- **Icons**: Lucide React (plus custom inline SVGs for brand icons)
- **Rendering**: HTML5 Canvas (2D)
- **Styling**: Plain CSS with a glassmorphism/neon look

## 👨‍💻 Developer

**Gowtham R**
📸 Instagram: [@gowtham_techie](https://www.instagram.com/gowtham_techie/)
🐙 GitHub: [Gowtham-R03](https://github.com/Gowtham-R03)

---
*Built with passion for AI and Spatial Computing.*
