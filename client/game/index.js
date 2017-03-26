$(document).ready(() => {
  const $gameBtn = $('#play-btn');
  const interval = 10 * 1000; // 10s

  $gameBtn.on('click', () => {
    
    $.ajax({
      url: '/lottery',
      method: 'POST'
    }).done((data) => {
      console.log(data);
    });
  });

  function isLuckDog() {
    if (!localStorage.getItem('prize')) {
      return false;
    }

    return true;
  }
});
