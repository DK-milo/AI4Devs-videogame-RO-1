// SpriteLoader.js
// Loads and maps sprites using SpriteMapping.json

export default class SpriteLoader {
  constructor(mappingUrl = 'documentation/SpriteMapping.json') {
    this.mappingUrl = mappingUrl;
    this.mapping = null;
    this.images = {};
    this.loaded = false;
  }

  async loadAll() {
    // Load mapping JSON
    const mappingResp = await fetch(this.mappingUrl);
    this.mapping = await mappingResp.json();

    // Load all images in mapping (spritesheets and individual vehicles)
    const imagePromises = [];
    for (const key of Object.keys(this.mapping)) {
      if (key === 'vehicles') {
        for (const v of this.mapping.vehicles) {
          if (!this.images[v.image]) {
            const img = new window.Image();
            const p = new Promise((resolve, reject) => {
              img.onload = () => resolve();
              img.onerror = reject;
            });
            img.src = v.image;
            this.images[v.image] = img;
            imagePromises.push(p);
          }
        }
      } else {
        const imgPath = this.mapping[key].image;
        if (!this.images[imgPath]) {
          const img = new window.Image();
          const p = new Promise((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = reject;
          });
          img.src = imgPath;
          this.images[imgPath] = img;
          imagePromises.push(p);
        }
      }
    }
    await Promise.all(imagePromises);
    this.loaded = true;
  }

  isLoaded() {
    return this.loaded;
  }

  getSprite(sheetKey, name) {
    if (!this.mapping || !this.images) return null;
    const sheet = this.mapping[sheetKey];
    if (!sheet) return null;
    let sprite = null;
    // Search in all sprite arrays in the sheet
    for (const key of Object.keys(sheet)) {
      if (Array.isArray(sheet[key])) {
        sprite = sheet[key].find(s => s.name === name);
        if (sprite) {
          return {
            ...sprite,
            image: this.images[sheet.image]
          };
        }
      }
    }
    return null;
  }

  getVehicleSprite(name) {
    if (!this.mapping || !this.images) return null;
    const v = (this.mapping.vehicles || []).find(v => v.name === name);
    if (!v) return null;
    return {
      ...v,
      image: this.images[v.image]
    };
  }
} 