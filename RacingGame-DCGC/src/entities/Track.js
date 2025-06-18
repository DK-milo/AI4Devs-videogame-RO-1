// Track.js
// Track generation and rendering

export default class Track {
  constructor(spriteLoader, canvas) {
    this.spriteLoader = spriteLoader;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.bgImage = null;
  }

  render() {
    // Ensure bgImage is loaded from mapping
    if (!this.bgImage && this.spriteLoader.mapping && this.spriteLoader.mapping.track) {
      const trackImgPath = this.spriteLoader.mapping.track.image;
      if (this.spriteLoader.images && this.spriteLoader.images[trackImgPath]) {
        this.bgImage = this.spriteLoader.images[trackImgPath];
      }
    }
    // Draw background image stretched to fit
    if (this.bgImage) {
      this.ctx.drawImage(this.bgImage, 0, 0, this.canvas.width, this.canvas.height);
    } else {
      this.ctx.fillStyle = '#8ec1c3';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  async loadAll() {
    // Ensure track_1.png is loaded
    const trackImg = 'assets/images/track_1.png';
    if (!this.images[trackImg]) {
      const img = new window.Image();
      const p = new Promise((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
      });
      img.src = trackImg;
      this.images[trackImg] = img;
      imagePromises.push(p);
    }
  }
} 