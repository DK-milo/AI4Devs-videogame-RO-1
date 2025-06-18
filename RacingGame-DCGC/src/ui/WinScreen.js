// WinScreen.js
// Winning screen UI

import { STATES } from '../core/StateMachine.js';

export default class WinScreen {
  constructor(stateMachine, inputHandler, canvas) {
    this.stateMachine = stateMachine;
    this.inputHandler = inputHandler;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.buttons = [
      { label: 'Retry', state: STATES.VEHICLE_SELECTION, x: 120, y: 250, w: 200, h: 50 },
      { label: 'Return to Menu', state: STATES.MENU, x: 120, y: 320, w: 200, h: 50 }
    ];
    this.handleClick = this.handleClick.bind(this);
    this.inputHandler.onClick(this.handleClick);
  }

  update() {}

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#222';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '36px Arial';
    this.ctx.fillText('You Win!', 150, 180);
    this.ctx.font = '24px Arial';
    this.buttons.forEach(btn => {
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

  destroy() {}
} 