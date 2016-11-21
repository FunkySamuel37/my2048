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
  removeZero(vertical, order) {
    let hasZero = true;
    const {column, row} = this;
    if (vertical) {
      while (hasZero) {
        for (let x = 0; x < row; x++) {

          let y = order ? column - 1 : 0;
          for (; order && y >= 0 || !order && y < column; order ? y-- : y++) {
            hasZero = false;
            let point = this.getPoint(x, y);
            if (!point.value) {
              let i =  order ? y - 1 : y + 1;

              for (; order && i >= 0 || !order && i <= column - y - 1; order ? i-- : i++) {
                let prePoint = this.getPoint(x, i);
                // debugger
                if (prePoint && prePoint.value) {
                  prePoint.y = y;
                  point.y = i;
                  hasZero = true;
                  break;
                } else if (prePoint == undefined){
                  console.log(`x: ${x}, y: ${i}`)
                } else {
                  continue;
                }
              }
            }
          }
        }
      }
    } else {
      while (hasZero) {
        for (let y = 0; y < column; y++) {

          let x = order ? row - 1 : 0;
          for (; order && x >= 0 || !order && x < row; order ? x-- : x++) {
            hasZero = false;
            let point = this.getPoint(x, y);
            if (!point.value) {
              let i =  order ? x - 1 : x + 1;
              for (; order && i >= 0 || !order && i <= row - x - 1; order ? i-- : i++) {
                let prePoint = this.getPoint(i, y);
                // debugger
                if (prePoint && prePoint.value) {
                  prePoint.x = x;
                  point.x = i;
                  hasZero = true;
                  break;
                } else if (prePoint == undefined){
                  console.log(`x: ${i}, y: ${y}`)
                } else {
                  continue;
                }
              }
            }
          }
        }
      }
    }


    console.log(this.getCatch());
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
    this.removeZero(vertical, order);
    //水平向右为右结合， 优先从右侧开始运算
    //水平向左为左结合， 优先从左侧开始运算
    //垂直向下为下结合， 优先从下侧开始运算
    //垂直向上为上结合， 优先从上侧开始运算
  }
}
