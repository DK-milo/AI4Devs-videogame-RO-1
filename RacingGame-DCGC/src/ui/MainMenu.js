// MainMenu.js
// Main menu UI

import { STATES } from '../core/StateMachine.js';

export default class MainMenu {
  constructor(stateMachine, inputHandler, canvas) {
    this.stateMachine = stateMachine;
    this.inputHandler = inputHandler;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.buttons = [
      { label: 'Start Game', state: STATES.VEHICLE_SELECTION, x: 100, y: 150, w: 200, h: 50 },
      { label: 'Instructions', state: STATES.INSTRUCTIONS, x: 100, y: 220, w: 200, h: 50 },
      { label: 'Credits', state: STATES.CREDITS, x: 100, y: 290, w: 200, h: 50 }
    ];
    this.handleClick = this.handleClick.bind(this);
    this.inputHandler.onClick(this.handleClick);
  }

  update() {
    // No dynamic updates needed for static menu
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#222';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '48px Arial';
    const title = 'RacingGame';
    const titleWidth = this.ctx.measureText(title).width;
    this.ctx.fillText(title, (this.canvas.width - titleWidth) / 2, this.canvas.height / 2 - 100);
    this.ctx.font = '32px Arial';
    this.buttons.forEach((btn, i) => {
      const btnX = (this.canvas.width - btn.w) / 2;
      const btnY = this.canvas.height / 2 - 20 + i * 80;
      btn.x = btnX;
      btn.y = btnY;
      this.ctx.fillStyle = '#444';
      this.ctx.fillRect(btn.x, btn.y, btn.w, btn.h);
      this.ctx.fillStyle = '#fff';
      this.ctx.fillText(btn.label, btn.x + 20, btn.y + 32);
    });
  }

  handleClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    for (const btn of this.buttons) {
      if (mx >= btn.x && mx <= btn.x + btn.w && my >= btn.y && my <= btn.y + btn.h) {
        this.stateMachine.setState(btn.state);
      }
    }
  }

  destroy() {
    // Remove click handler if needed
  }
} 