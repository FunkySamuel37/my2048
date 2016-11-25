import DirectionTypes from '../constants/DirectionTypes.js'

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
    this.row = 4;
    this.column = 4;
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
  getPoint(x, y) {
    return this.cache.find(p => p.x === x && p.y === y);
  }
  getPointWithVector(x, y, vertical, order) {
    if (vertical) {
      if (order) {
        return this.getPoint(y, 3-x)
      } else {
        return this.getPoint(y, x)
      }
    } else {
      if (order) {
        return this.getPoint(3-x, y)
      } else {
        //向左
        return this.getPoint(x, y);
      }
    }
  }

  move(vertical, order) {

    let moved = false;
    //向左
    for (let row = 0; row < 4; row++) {
      //处理合并
      for (let col = 0; col < 4; col++) {
        const point = this.getPointWithVector(col, row, vertical, order);
        let i = col + 1;
        let other = this.getPointWithVector(i, row, vertical, order);
        while (other && point.value) {
          i++;
          if (other.value && point.value && other.value === point.value) {
            point.value += other.value;
            other.value = 0;
            moved = true;
            break;
          } else if (other.value && point.value && other.value !== point.value) {
            break;
          }
          other = this.getPointWithVector(i, row, vertical, order);
        }

      }
      //去零操作
      for (let i = 0; i < 4; i++) {
        const point = this.getPointWithVector(i, row, vertical, order);
        let j = i + 1;
        let other = this.getPointWithVector(j, row, vertical, order);
        if (point.value !== 0) continue;
        while (other) {
          if (other.value !== 0) {
            point.value = other.value;
            other.value = 0;
            moved = true;
            break;
          }
          j++;
          other = this.getPointWithVector(j, row, vertical, order);
        }
      }

    }
    return moved;
  }
  mergeItems(direction) {
    let vertical = true;
    let order = true;
    switch(direction) {
      case DirectionTypes.UP:
        order = false;
        break;
      case DirectionTypes.DOWN:
        break;
      case DirectionTypes.LEFT:
        vertical = false;
        order = false
        break;
      case DirectionTypes.RIGHT:
        vertical = false;
//第一次向右推结果正常
        break;
      default:
        return;
    }
    console.log('move')
    return this.move(vertical, order);
    // this.removeZero(vertical, order);
    //水平向右为右结合， 优先从右侧开始运算
    //水平向左为左结合， 优先从左侧开始运算
    //垂直向下为下结合， 优先从下侧开始运算
    //垂直向上为上结合， 优先从上侧开始运算
  }
}
