// HUD.js
// Lap counter, position, etc.

export default class HUD {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.lap = 1;
    this.totalLaps = 3;
    this.position = 1;
    this.totalRacers = 4;
  }

  setLap(lap) {
    this.lap = lap;
  }

  setPosition(pos) {
    this.position = pos;
  }

  update(lap, pos) {
    this.lap = lap;
    this.position = pos;
  }

  setTotalLaps(total) {
    this.totalLaps = total;
  }

  setTotalRacers(total) {
    this.totalRacers = total;
  }

  render() {
    this.ctx.save();
    this.ctx.font = '20px Arial';
    this.ctx.fillStyle = '#fff';
    this.ctx.fillText(`Lap: ${this.lap} / ${this.totalLaps}`, 20, 30);
    this.ctx.fillText(`Position: ${this.position} / ${this.totalRacers}`, 320, 30);
    this.ctx.restore();
  }
} 