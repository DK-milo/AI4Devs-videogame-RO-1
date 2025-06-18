// StateMachine.js
// Handles game states (menu, selection, game, win, gameover, instructions, credits)

export const STATES = {
  MENU: 'MENU',
  VEHICLE_SELECTION: 'VEHICLE_SELECTION',
  GAME: 'GAME',
  WIN: 'WIN',
  GAMEOVER: 'GAMEOVER',
  INSTRUCTIONS: 'INSTRUCTIONS',
  CREDITS: 'CREDITS',
};

export default class StateMachine {
  constructor(initialState = STATES.MENU) {
    this.currentState = initialState;
    this.callbacks = [];
  }

  setState(newState) {
    if (this.currentState !== newState) {
      this.currentState = newState;
      this.callbacks.forEach(cb => cb(newState));
    }
  }

  getState() {
    return this.currentState;
  }

  onChange(callback) {
    this.callbacks.push(callback);
  }
} 