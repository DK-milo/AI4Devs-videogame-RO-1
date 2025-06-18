// GameScreen.js
// Minimal playable prototype for the game screen

import { STATES } from '../core/StateMachine.js';
import Track from '../entities/Track.js';
import Vehicle from '../entities/Vehicle.js';
import HUD from './HUD.js';

export default class GameScreen {
  constructor(stateMachine, inputHandler, spriteLoader, canvas, selectedVehicleName) {
    this.stateMachine = stateMachine;
    this.inputHandler = inputHandler;
    this.spriteLoader = spriteLoader;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.track = new Track(spriteLoader, canvas);
    this.hud = new HUD(canvas);
    this.hud.setTotalLaps(3);
    this.hud.setTotalRacers(4);
    this.canvas.width = 1920;
    this.canvas.height = 1080;
    // Player vehicle (start left, face right)
    const playerSprite = spriteLoader.getVehicleSprite(selectedVehicleName);
    this.player = new Vehicle(150, 540, playerSprite, canvas);
    this.player.angle = Math.PI / 2;
    // Input state
    this.inputState = { up: false, down: false, left: false, right: false };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.inputHandler.onKeyDown(this.handleKeyDown);
    this.inputHandler.onKeyUp(this.handleKeyUp);
    // Lap logic
    this.lap = 1;
    // Set random total laps (3-5)
    this.totalLaps = Math.floor(Math.random() * 3) + 3;
    this.hud.setTotalLaps(this.totalLaps);
    this.finished = false;
    // AI vehicles (start left, spaced vertically)
    this.aiVehicles = [];
    this.aiLaps = [1, 1, 1];
    this.aiSpeeds = [
      2.0 + Math.random() * 1.5,
      2.0 + Math.random() * 1.5,
      2.0 + Math.random() * 1.5
    ];
    const aiNames = ["car_green_1", "car_blue_1", "car_yellow_1"];
    for (let i = 0; i < 3; i++) {
      const aiSprite = spriteLoader.getVehicleSprite(aiNames[i]);
      const ai = new Vehicle(150, 440 + i * 120, aiSprite, canvas);
      ai.angle = Math.PI / 2;
      this.aiVehicles.push(ai);
    }
  }

  handleKeyDown(e) {
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') this.inputState.up = true;
    if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') this.inputState.down = true;
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') this.inputState.left = true;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') this.inputState.right = true;
  }

  handleKeyUp(e) {
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') this.inputState.up = false;
    if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') this.inputState.down = false;
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') this.inputState.left = false;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') this.inputState.right = false;
  }

  update() {
    if (this.finished) return;
    this.player.update(this.inputState);
    // AI logic: use random speed for each AI
    for (let i = 0; i < this.aiVehicles.length; i++) {
      const ai = this.aiVehicles[i];
      ai.speed = this.aiSpeeds[i];
      ai.angle = Math.PI / 2 + (Math.random() - 0.5) * 0.05; // Wiggle
      ai.update({ up: true });
      // Lap logic for AI: finish line at x > 1800
      if (ai.x > 1800 && this.aiLaps[i] < this.totalLaps) {
        this.aiLaps[i]++;
        ai.x = 150;
        ai.y = 440 + i * 120;
        ai.angle = Math.PI / 2;
      } else if (this.aiLaps[i] >= this.totalLaps && ai.x > 1800) {
        this.finished = true;
        setTimeout(() => this.stateMachine.setState(STATES.GAMEOVER), 1000);
      }
    }
    // Player lap logic: finish line at x > 1800
    if (this.player.x > 1800 && this.lap < this.totalLaps) {
      this.lap++;
      this.player.x = 150;
      this.player.y = 540;
      this.player.angle = Math.PI / 2;
    } else if (this.lap >= this.totalLaps && this.player.x > 1800) {
      // Check if player is first
      const playerFinishedFirst = this.aiLaps.every(lap => lap < this.totalLaps);
      this.finished = true;
      setTimeout(() => this.stateMachine.setState(playerFinishedFirst ? STATES.WIN : STATES.GAMEOVER), 1000);
    }
    // Calculate position (progress = lap * 2000 + x)
    let position = 1;
    const playerProgress = this.lap * 2000 + this.player.x;
    for (let i = 0; i < this.aiVehicles.length; i++) {
      const aiProgress = this.aiLaps[i] * 2000 + this.aiVehicles[i].x;
      if (aiProgress > playerProgress) position++;
    }
    this.hud.update(this.lap, position);
  }

  render() {
    this.track.render();
    this.aiVehicles.forEach(ai => ai.render());
    this.player.render();
    this.hud.render();
  }

  destroy() {
    // Remove input listeners if needed
  }
} 