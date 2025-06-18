# RacingGame - Game Design Document (GDD)

## Game Name
RacingGame

## Genre
Top-down 2D Racing Game

## Theme
Cartoon-style, colorful vehicles and tracks

---

## Game Elements
- Fast-paced racing
- Competing against AI opponents
- Completing a random number of laps (3 to 5)
- Multiple car choices (visual only, using individual PNGs)
- Circuit track as a single background image

## Player
- Single player
- Player selects a car (visual choice only)

---

## Technical Specs
- **Technical Form:** 2D graphics (HTML5 Canvas)
- **View:** Top-down camera
- **Platform:** Web browsers (desktop and mobile compatible)
- **Language:** JavaScript, HTML, CSS

---

## Gameplay
The player controls a cartoon-style car from a top-down perspective, racing against AI opponents on a closed circuit track. The objective is to complete a random number of laps (3 to 5) and finish in first place. The player can choose from a variety of visually distinct cars, but all cars have the same stats. The game features simple, responsive controls using either the arrow keys or WASD. Each AI opponent is assigned a random speed at the start of the race, making each race unique. The track is a single image background, not tile-based. There are no power-ups or progression systems, keeping the gameplay focused and accessible.

---

## Game Play Outline
- Opening the game in a web browser
- Selecting a car (visual choice)
- Starting the race
- Racing against AI on a circuit track
- Completing 3 laps
- Winning by finishing first
- Losing by not finishing first
- Option to restart

---

## Key Features
- Simple, intuitive controls (Arrow keys/WASD)
- Multiple car appearances (from individual PNGs)
- Colorful, cartoon-style graphics
- Top-down racing action
- AI opponents with random speed per race
- Random number of laps (3 to 5)
- Lightweight, fast loading

---

## Design Guidelines
- Keep the game lightweight and accessible
- Focus on fun, fast-paced racing
- No complex progression or power-ups
- Visual variety through car selection
- Responsive controls for all players

---

## Game Design Definitions
- **Win Condition:** Complete the random number of laps and finish in first place
- **Lose Condition:** Finish the race in any position other than first
- **Main Focus:** Outrace AI opponents on a circuit track (single image)
- **Level Transition:** Restart option after race ends

---

## Game Flowchart (List)
- Menu (Car Selection)
- Race Start
- Game Play (Racing, Lap Counting)
- Game Over (Win/Lose)
- Option to Restart

---

## Player Definition
- Controls a single car
- Can choose car appearance
- No upgrades or stat changes

### Player Properties
- Position on track
- Lap count
- Current speed
- Feedback: Visual effects for speed, lap notifications

### Player Rewards
- Visual variety in car selection
- Satisfaction of winning the race

---

## User Interface (UI)
- Car selection menu (visual grid of cars from spritesheet)
- Lap counter and position display during race
- Start, win, and lose screens
- Controls: Arrow keys and WASD for movement

---

## Art Style Description
The game uses a cartoon-style, top-down perspective. Vehicles are colorful and stylized, as seen in the provided car PNGs (`car_black_1.png`, `car_blue_1.png`, etc.), all with bold outlines and simple shading. The track is a single image background (`track_1.png`).

---

## Sound Effects
- No sound effects or music in the initial version

---

## Progression & Content
- No progression system
- Difficulty increases by making AI faster

---

## References
- [Unity Game Design Document Template (PDF)](https://connect-prd-cdn.unity.com/20201215/83f3733d-3146-42de-8a69-f461d6662eb1/Game-Design-Document-Template.pdf)

---

## Detailed Game Flow and Technical Design

### 1. Main Menu
- Options: Start Game, Instructions, Credits
- No background music or animation on the menu

### 2. Vehicle Selection
- Player selects a vehicle by clicking on a grid of available vehicles
- No large preview; selection is visual in the grid
- "Back" button available to return to the main menu

### 3. Game Screen
- 3 AI opponents per race
- Track is a single image background (`track_1.png`)
- Lap counter UI is present
- No pause functionality for now

### 4. Winning & Game Over Screens
- No stats shown on win/game over screens
- Options: Retry, Return to Menu

### 5. Controls
- Both Arrow keys and WASD are supported simultaneously
- No mobile/touch controls for now

### 6. Art & Assets
- All sprite loading uses the JSON mapping in SpriteMapping.json
- Track/background is tile-based, not a single image

### 7. Code Structure
- Use ES6 classes and modules for all code
- Implement a simple state machine for game states (menu, selection, game, win, gameover)
- Use a game loop with requestAnimationFrame

### 8. Game Loop & Patterns
- The game loop will centrally handle all updates (movement, collision, rendering)
- Observer pattern will be used for UI updates (e.g., lap counter, position)

---

## Codebase Structure Documentation

The following structure is used for the RacingGame project to ensure maintainability, scalability, and adherence to SOLID principles and game design patterns:

```
RacingGame-DCGC/
├── index.html
├── styles.css
├── game.js                # Main entry point, initializes the game
├── assets/
│   └── images/
│       ├── car_black_1.png
│       ├── car_blue_1.png
│       ├── car_green_1.png
│       ├── car_red_1.png
│       ├── car_yellow_1.png
│       └── track_1.png
├── documentation/
│   ├── RacingGame_GDD.md
│   └── SpriteMapping.json
├── src/
│   ├── core/
│   │   ├── GameLoop.js        # Game loop and state management
│   │   ├── StateMachine.js    # Handles game states (menu, selection, game, win, gameover)
│   │   └── Observer.js        # Observer pattern for UI updates
│   ├── entities/
│   │   ├── Vehicle.js         # Vehicle class (player and AI)
│   │   └── Track.js           # Track rendering (single image)
│   ├── ui/
│   │   ├── MainMenu.js        # Main menu UI (centered)
│   │   ├── VehicleSelection.js# Vehicle selection UI
│   │   ├── GameScreen.js      # Main game/race screen
│   │   ├── HUD.js             # Lap/position display
│   │   ├── WinScreen.js       # Win UI
│   │   ├── GameOverScreen.js  # Lose UI
│   │   ├── Instructions.js    # Instructions UI
│   │   └── Credits.js         # Credits UI
│   ├── input/
│   │   └── InputHandler.js    # Handles keyboard input (arrows/WASD)
│   ├── assets/
│   │   └── SpriteLoader.js    # Loads and maps sprites using SpriteMapping.json
│   └── utils/
│       └── Random.js          # Utility for random track generation
└── README.md
```

### Component Responsibilities
- **core/**: Game loop, state management, and observer pattern for UI updates.
- **entities/**: Game objects such as vehicles, tracks, and tiles.
- **ui/**: All user interface screens and overlays.
- **input/**: Keyboard input handling.
- **assets/**: Sprite loading and mapping.
- **utils/**: Utility functions (e.g., random track generation).

This structure supports modular development and clear separation of concerns, making it easier to extend and maintain the game.

---

This section summarizes the technical and design decisions for the project, ensuring clarity and alignment with SOLID principles and game design patterns for future development. 