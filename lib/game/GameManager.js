/* eslint no-restricted-syntax: off, prefer-const: off */

const allPrizes = {
  iPhone: 5,
  Kindle: 10,
  Card: 100
};
const probability = 0.1;

export default class GameManager {
  getPrizeCount() {
    return Object.values(allPrizes).reduce((pre, cur) => pre + cur, 0);
  }

  ifHasPrizes() { // 判断奖品是否还有剩余
    let count = 0;
    for (let pr in allPrizes) {
      if (allPrizes.hasOwnProperty(pr)) {
        count += allPrizes[pr];
      }
    }
    if (!isNaN(Number.parseInt(count, 10)) && count > 0) {
      return true;
    }

    return false;
  }

  ifWinPrize() { // 判断是否抽中奖品
    if (this.ifHasPrizes() && Math.random() <= probability) {
      return true;
    }

    return false;
  }

  pickPrize() { // 抽中奖后开始随机分配一个剩余奖品
    let prize = ''; // 最终奖品
    const index = Number.parseInt(
                    Math.random() * this.getPrizeCount()
                  , 10); // 奖品序号

    let curIndex = 0;
    const prizeNames = Object.keys(allPrizes);
    for (let pr of prizeNames) {
      curIndex += allPrizes[pr];
      if (curIndex > index) {
        prize = pr;
        allPrizes[pr] -= 1;
        break;
      }
    }

    return prize;
  }
}
