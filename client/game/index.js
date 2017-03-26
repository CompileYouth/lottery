$(document).ready(() => {
  const $gameBtn = $('#play-btn');

  $gameBtn.on('click', () => {
    $.ajax({
      url: '/lottery',
      method: 'POST'
    }).done((data) => {
      
    });
  });
});
