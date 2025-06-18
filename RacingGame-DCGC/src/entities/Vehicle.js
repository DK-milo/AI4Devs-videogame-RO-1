// Vehicle.js
// Vehicle class for player and AI

export default class Vehicle {
  constructor(x, y, sprite, canvas) {
    this.x = x;
    this.y = y;
    this.angle = Math.PI / 2;
    this.speed = 0;
    this.maxSpeed = 3;
    this.acceleration = 0.1;
    this.friction = 0.05;
    this.turnSpeed = 0.04;
    this.sprite = sprite;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = sprite.width;
    this.height = sprite.height;
  }

  update(input) {
    // Basic movement: up/down/left/right or WASD
    if (input.up) {
      this.speed += this.acceleration;
    } else if (input.down) {
      this.speed -= this.acceleration;
    } else {
      // Apply friction
      if (this.speed > 0) this.speed -= this.friction;
      if (this.speed < 0) this.speed += this.friction;
      if (Math.abs(this.speed) < this.friction) this.speed = 0;
    }
    this.speed = Math.max(-this.maxSpeed, Math.min(this.maxSpeed, this.speed));
    if (input.left) {
      this.angle -= this.turnSpeed * (this.speed !== 0 ? (this.speed / this.maxSpeed) : 1);
    }
    if (input.right) {
      this.angle += this.turnSpeed * (this.speed !== 0 ? (this.speed / this.maxSpeed) : 1);
    }
    // Update position
    this.x += Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
    // Prevent leaving canvas
    const halfW = this.sprite.width / 2;
    const halfH = this.sprite.height / 2;
    this.x = Math.max(halfW, Math.min(this.canvas.width - halfW, this.x));
    this.y = Math.max(halfH, Math.min(this.canvas.height - halfH, this.y));
  }

  render() {
    if (!this.sprite || !this.sprite.image) return;
    const ctx = this.canvas.getContext('2d');
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(
      this.sprite.image,
      0, 0, this.sprite.width, this.sprite.height,
      -this.sprite.width / 2, -this.sprite.height / 2,
      this.sprite.width, this.sprite.height
    );
    ctx.restore();
  }
} 