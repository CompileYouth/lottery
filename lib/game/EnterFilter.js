import GameManager from './GameManager';

const gameManager = new GameManager();
const sessionMap = new Map();
const interval = 10 * 1000; // 10s

export default class EnterFilter {
  totalNumberFilter(currentCount) { // 当同时请求的个数大于 115 * 10 时，拒绝访问
    const total = gameManager.getPrizeCount() * 10; // 当前允许进入的最大人数

    if (currentCount >= total) {
      return false;
    }

    return true;
  }

  sessionFilter(sessionID) { // 当同一个 session 在 10s 内连续访问时，拒绝访问
    const sessionExpire = sessionMap.get(sessionID);

    sessionMap.set(sessionID, (new Date()).getTime() + interval);

    if (sessionExpire >= (new Date()).getTime()) {
      return false;
    }

    return true;
  }
}
