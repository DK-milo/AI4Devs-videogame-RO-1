// InputHandler.js
// Handles keyboard input (arrows/WASD) and mouse clicks

export default class InputHandler {
  constructor() {
    this.keyDownCallbacks = [];
    this.keyUpCallbacks = [];
    this.clickCallbacks = [];
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);
    this._onClick = this._onClick.bind(this);
    window.addEventListener('keydown', this._onKeyDown);
    window.addEventListener('keyup', this._onKeyUp);
    window.addEventListener('click', this._onClick);
  }

  _onKeyDown(e) {
    // Only handle movement keys (arrows, WASD)
    const validKeys = [
      'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
      'w', 'a', 's', 'd', 'W', 'A', 'S', 'D'
    ];
    if (validKeys.includes(e.key)) {
      this.keyDownCallbacks.forEach(cb => cb(e));
    }
  }

  _onKeyUp(e) {
    const validKeys = [
      'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
      'w', 'a', 's', 'd', 'W', 'A', 'S', 'D'
    ];
    if (validKeys.includes(e.key)) {
      this.keyUpCallbacks.forEach(cb => cb(e));
    }
  }

  _onClick(e) {
    this.clickCallbacks.forEach(cb => cb(e));
  }

  onKeyDown(callback) {
    this.keyDownCallbacks.push(callback);
  }

  onKeyUp(callback) {
    this.keyUpCallbacks.push(callback);
  }

  onClick(callback) {
    this.clickCallbacks.push(callback);
  }

  destroy() {
    window.removeEventListener('keydown', this._onKeyDown);
    window.removeEventListener('keyup', this._onKeyUp);
    window.removeEventListener('click', this._onClick);
    this.keyDownCallbacks = [];
    this.keyUpCallbacks = [];
    this.clickCallbacks = [];
  }
} 