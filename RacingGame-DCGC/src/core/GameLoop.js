// GameLoop.js
// Main game loop and state management

export default class GameLoop {
  constructor(stateMachine) {
    this.stateMachine = stateMachine;
    this.running = false;
    this.lastTimestamp = 0;
    this.rafId = null;
    this.stateHandlers = {}; // { state: { update, render } }
  }

  registerStateHandler(state, handler) {
    // handler: { update: fn, render: fn }
    this.stateHandlers[state] = handler;
  }

  start() {
    if (!this.running) {
      this.running = true;
      this.lastTimestamp = performance.now();
      this.loop(this.lastTimestamp);
    }
  }

  stop() {
    this.running = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  loop(timestamp) {
    if (!this.running) return;
    const delta = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;

    const state = this.stateMachine.getState();
    const handler = this.stateHandlers[state];
    if (handler) {
      handler.update && handler.update(delta);
      handler.render && handler.render();
    }

    this.rafId = requestAnimationFrame(this.loop.bind(this));
  }
} 