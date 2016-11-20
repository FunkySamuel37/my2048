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
    this.fillAZeroPoint();
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
  fillAZeroPoint() {
    const zeroPointArr = this.findZeroPoint();
    zeroPointArr[this.getRandom(zeroPointArr.length-1)].value = (this.getRandom(1)+1)*2;
  }
  findZeroPoint() {
    return this.cache.filter(point => !point.value)
  }
  getRandom(length) {
    return Math.round(Math.random() * length);
  }
}
