(function(){

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

  menu.opened = false;
  menu.render();
  changeButtonText();
  function changeButtonText() {
    button.textContent = menu.opened ? 'Close' : 'Menu';
  }

  button.addEventListener('click', function() {
    menu.opened = !menu.opened;
    changeButtonText();
  });

})();
