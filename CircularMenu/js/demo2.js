(function(){
  function changeButtonText() {
    button.textContent = menu.opened ? 'Close' : 'Menu';
  }

  var button = document.getElementById('cn-button');
  var container = document.getElementById('menu-container');
  var menu = new CircularMenu(container);
  menu.marginAngle = 2;
  menu.addItem('aa', 'AAAAAAAAAAAAAAA');
  menu.addItem('bb', 'BBBBBBBBBBBBBBB');
  menu.addItem('cc', 'CCCCCCCCCCCCCCC');
  menu.addItem('dd', 'DDDDDDDDDDDDDDD');
  menu.addItem('ee', 'EEEEEEEEEEEEEEE');
  menu.addItem('ff', 'FFFFFFFFFFFFFFF');
  menu.render();

  changeButtonText();

  button.addEventListener('click', function() {
    if (menu.opened) {
      menu.close().then(changeButtonText);
    } else {
      menu.open().then(changeButtonText);
    }
  });

})();
