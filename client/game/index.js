$(document).ready(() => {
  const $gameBtn = $('#play-btn');
  const interval = 10 * 1000; // 允许点击时间间隔：10s
  let disable = false; // 是否允许点击
  const cells = [$('.play-0'), $('.play-1'), $('.play-2'), $('.play-3'), $('.play-4'), $('.play-5'), $('.play-6'), $('.play-7')];
  let animationInterval = 60; // 抽奖转盘动画间隔
  let ifLowdownSpeed = false; // 是否允许降低动画速度
  let cellNumber = 1;
  let currentCell = null;
  let finalCellNumber = null;

  if (isLuckDog()) {
    disable = true;
    $gameBtn.removeClass('disable');
  }

  $gameBtn.on('click', (e) => {
    e.preventDefault();

    // “开始游戏”按钮是否被禁止点击
    if (disable) {
      return;
    }
    disable = true;
    $gameBtn.addClass('disable');
    setTimeout(() => {
      disable = false;
      $gameBtn.removeClass('disable');
    }, interval);

    setTimeout(() => {
      ifLowdownSpeed = true;
      animationInterval = 280;
    }, 6000);

    setTimeout(animate, animationInterval);

    $.ajax({
      url: '/lottery',
      method: 'POST'
    }).done((data) => {
      handleResult(data);
    });
  });

  function animate() {
    if (currentCell) currentCell.removeClass('selected');
    currentCell = cells[cellNumber % 8];
    cellNumber += 1;
    currentCell.addClass('selected');

    if (ifLowdownSpeed && cellNumber % 8 === finalCellNumber) {
      animationInterval = 60;
      ifLowdownSpeed = false;
      return;
    }

    animationInterval += 1;
    setTimeout(animate, animationInterval);
  }

  function handleResult(data) {
    if (ifLowdownSpeed) animationInterval = 280;

    if (!data.result.lucky) {
      finalCellNumber = 7;
      return;
    }
    switch (data.result.prize) {
      case 'iPhone':
        finalCellNumber = 1;
        break;
      case 'Kindle':
        finalCellNumber = 3;
        break;
      case 'Card':
        finalCellNumber = 4;
        break;
      default:
        finalCellNumber = 7;
    }
  }

  function isLuckDog() {
    if (!window.localStorage.getItem('prize')) {
      return false;
    }

    return true;
  }
});
