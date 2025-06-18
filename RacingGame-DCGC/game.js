// game.js
// Main entry point for RacingGame

import StateMachine, { STATES } from './src/core/StateMachine.js';
import GameLoop from './src/core/GameLoop.js';
import SpriteLoader from './src/assets/SpriteLoader.js';
import InputHandler from './src/input/InputHandler.js';
import MainMenu from './src/ui/MainMenu.js';
import VehicleSelection from './src/ui/VehicleSelection.js';
import GameScreen from './src/ui/GameScreen.js';
import WinScreen from './src/ui/WinScreen.js';
import GameOverScreen from './src/ui/GameOverScreen.js';
import Instructions from './src/ui/Instructions.js';
import Credits from './src/ui/Credits.js';

// Setup canvas
const canvas = document.createElement('canvas');
canvas.width = 1920;
canvas.height = 1080;
canvas.style.display = 'block';
canvas.style.width = '1920px';
canvas.style.height = '1080px';
document.getElementById('game-container').appendChild(canvas);

// Core systems
const stateMachine = new StateMachine();
const gameLoop = new GameLoop(stateMachine);
const spriteLoader = new SpriteLoader();
const inputHandler = new InputHandler();

// UI screens (will be initialized after assets load)
let mainMenu = null;
let vehicleSelection = null;
let activeUI = null;
let gameScreen = null;
let selectedVehicleName = null;
let winScreen = null;
let gameOverScreen = null;
let instructionsScreen = null;
let creditsScreen = null;

function setActiveUI(ui) {
  activeUI = ui;
}

function registerHandlers() {
  gameLoop.registerStateHandler(STATES.MENU, {
    update: () => activeUI && activeUI.update(),
    render: () => activeUI && activeUI.render()
  });
  gameLoop.registerStateHandler(STATES.VEHICLE_SELECTION, {
    update: () => activeUI && activeUI.update(),
    render: () => activeUI && activeUI.render()
  });
  gameLoop.registerStateHandler(STATES.GAME, {
    update: () => gameScreen && gameScreen.update(),
    render: () => gameScreen && gameScreen.render()
  });
  gameLoop.registerStateHandler(STATES.WIN, {
    update: () => winScreen && winScreen.update(),
    render: () => winScreen && winScreen.render()
  });
  gameLoop.registerStateHandler(STATES.GAMEOVER, {
    update: () => gameOverScreen && gameOverScreen.update(),
    render: () => gameOverScreen && gameOverScreen.render()
  });
  gameLoop.registerStateHandler(STATES.INSTRUCTIONS, {
    update: () => instructionsScreen && instructionsScreen.update(),
    render: () => instructionsScreen && instructionsScreen.render()
  });
  gameLoop.registerStateHandler(STATES.CREDITS, {
    update: () => creditsScreen && creditsScreen.update(),
    render: () => creditsScreen && creditsScreen.render()
  });
}

function onStateChange(newState) {
  if (activeUI && activeUI.destroy) activeUI.destroy();
  if (gameScreen && gameScreen.destroy) gameScreen.destroy();
  if (winScreen && winScreen.destroy) winScreen.destroy();
  if (gameOverScreen && gameOverScreen.destroy) gameOverScreen.destroy();
  if (instructionsScreen && instructionsScreen.destroy) instructionsScreen.destroy();
  if (creditsScreen && creditsScreen.destroy) creditsScreen.destroy();
  if (newState === STATES.MENU) {
    mainMenu = mainMenu || new MainMenu(stateMachine, inputHandler, canvas);
    setActiveUI(mainMenu);
    gameScreen = null;
    winScreen = null;
    gameOverScreen = null;
    instructionsScreen = null;
    creditsScreen = null;
  } else if (newState === STATES.VEHICLE_SELECTION) {
    vehicleSelection = new VehicleSelection(stateMachine, inputHandler, spriteLoader, canvas);
    vehicleSelection.onVehicleSelected = (name) => {
      selectedVehicleName = name;
      stateMachine.setState(STATES.GAME);
    };
    setActiveUI(vehicleSelection);
    gameScreen = null;
    winScreen = null;
    gameOverScreen = null;
    instructionsScreen = null;
    creditsScreen = null;
  } else if (newState === STATES.GAME) {
    if (selectedVehicleName) {
      gameScreen = new GameScreen(stateMachine, inputHandler, spriteLoader, canvas, selectedVehicleName);
    }
    setActiveUI(null);
    winScreen = null;
    gameOverScreen = null;
    instructionsScreen = null;
    creditsScreen = null;
  } else if (newState === STATES.WIN) {
    winScreen = new WinScreen(stateMachine, inputHandler, canvas);
    setActiveUI(winScreen);
    gameScreen = null;
    gameOverScreen = null;
    instructionsScreen = null;
    creditsScreen = null;
  } else if (newState === STATES.GAMEOVER) {
    gameOverScreen = new GameOverScreen(stateMachine, inputHandler, canvas);
    setActiveUI(gameOverScreen);
    gameScreen = null;
    winScreen = null;
    instructionsScreen = null;
    creditsScreen = null;
  } else if (newState === STATES.INSTRUCTIONS) {
    instructionsScreen = new Instructions(stateMachine, inputHandler, canvas);
    setActiveUI(instructionsScreen);
    gameScreen = null;
    winScreen = null;
    gameOverScreen = null;
    creditsScreen = null;
  } else if (newState === STATES.CREDITS) {
    creditsScreen = new Credits(stateMachine, inputHandler, canvas);
    setActiveUI(creditsScreen);
    gameScreen = null;
    winScreen = null;
    gameOverScreen = null;
    instructionsScreen = null;
  } else {
    setActiveUI(null);
    gameScreen = null;
    winScreen = null;
    gameOverScreen = null;
    instructionsScreen = null;
    creditsScreen = null;
  }
}

async function start() {
  await spriteLoader.loadAll();
  registerHandlers();
  stateMachine.onChange(onStateChange);
  onStateChange(stateMachine.getState());
  gameLoop.start();
}

start(); 