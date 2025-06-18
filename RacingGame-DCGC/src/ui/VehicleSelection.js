// VehicleSelection.js
// Vehicle selection UI

import { STATES } from '../core/StateMachine.js';

export default class VehicleSelection {
  constructor(stateMachine, inputHandler, spriteLoader, canvas) {
    this.stateMachine = stateMachine;
    this.inputHandler = inputHandler;
    this.spriteLoader = spriteLoader;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.selectedIndex = null;
    this.grid = [];
    this.margin = 30;
    this.cellW = 90;
    this.cellH = 130;
    this.vehicles = spriteLoader.mapping.vehicles;
    this.handleClick = this.handleClick.bind(this);
    this.inputHandler.onClick(this.handleClick);
    this.backBtn = { label: 'Back', x: 20, y: 20, w: 80, h: 40 };
    this.setupGrid();
  }

  setupGrid() {
    // Arrange vehicles in a single column for now
    this.grid = this.vehicles.map((v, i) => ({
      ...v,
      x: this.margin,
      y: 80 + i * (this.cellH + this.margin),
      w: this.cellW,
      h: this.cellH
    }));
  }

  update() {
    // No dynamic updates needed for static selection
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#222';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = '28px Arial';
    this.ctx.fillStyle = '#fff';
    this.ctx.fillText('Select Your Vehicle', 120, 50);
    // Draw vehicles
    this.grid.forEach((v, i) => {
      this.ctx.save();
      if (this.selectedIndex === i) {
        this.ctx.strokeStyle = '#FFD700';
        this.ctx.lineWidth = 4;
        this.ctx.strokeRect(v.x - 4, v.y - 4, v.w + 8, v.h + 8);
      }
      this.ctx.drawImage(
        this.spriteLoader.images[v.image],
        0, 0, v.width, v.height,
        v.x, v.y, v.w, v.h
      );
      this.ctx.restore();
    });
    // Draw Back button
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
    // Check vehicle selection
    for (let i = 0; i < this.grid.length; i++) {
      const v = this.grid[i];
      if (mx >= v.x && mx <= v.x + v.w && my >= v.y && my <= v.y + v.h) {
        this.selectedIndex = i;
        if (typeof this.onVehicleSelected === 'function') {
          this.onVehicleSelected(v.name);
        }
        return;
      }
    }
    // Check Back button
    const b = this.backBtn;
    if (mx >= b.x && mx <= b.x + b.w && my >= b.y && my <= b.y + b.h) {
      this.stateMachine.setState(STATES.MENU);
    }
  }

  destroy() {
    // Remove click handler if needed
  }
} 