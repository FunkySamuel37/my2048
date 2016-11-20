class Point {
  constructor({x,y}) {
    this.x = x;
    this.y = y;
    this.value = 0;
  }
}

export class TwoZeroFourEightMap {
  constructor() {
    this.cache = this.generateMap();
  }
  generateMap() {
    const map = [];
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        map.push(new Point({x,y}))
      }
    }
    return map;
  }
  getCatch() {
    return this.cache;
  }
}
