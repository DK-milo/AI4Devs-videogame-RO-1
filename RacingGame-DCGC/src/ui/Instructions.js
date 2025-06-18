// Instructions.js
// Instructions screen UI

import { STATES } from '../core/StateMachine.js';

export default class Instructions {
  constructor(stateMachine, inputHandler, canvas) {
    this.stateMachine = stateMachine;
    this.inputHandler = inputHandler;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.backBtn = { label: 'Back', x: 20, y: 20, w: 80, h: 40 };
    this.handleClick = this.handleClick.bind(this);
    this.inputHandler.onClick(this.handleClick);
  }

  update() {}

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#222';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '32px Arial';
    this.ctx.fillText('Instructions', 120, 80);
    this.ctx.font = '20px Arial';
    this.ctx.fillText('Use Arrow keys or WASD to drive.', 60, 140);
    this.ctx.fillText('Complete 3 laps to win.', 60, 170);
    this.ctx.fillText('Avoid letting AI finish first!', 60, 200);
    // Back button
    this.ctx.fillStyle = '#444';
    this.ctx.fillRect(this.backBtn.x, this.backBtn.y, this.backBtn.w, this.backBtn.h);
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '20px Arial';
    this.ctx.fillText(this.backBtn.label, this.backBtn.x + 10, this.backBtn.y + 28);
  }

  handleClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const b = this.backBtn;
    if (mx >= b.x && mx <= b.x + b.w && my >= b.y && my <= b.y + b.h) {
      this.stateMachine.setState(STATES.MENU);
    }
  }

  destroy() {}
} 