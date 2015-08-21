(function(){

	var button = document.getElementById('cn-button'),
    wrapper = document.getElementById('cn-wrapper');

    //open and close menu when the button is clicked
	var open = false;
	button.addEventListener('click', handler, false);

	function handler(){
	  if(!open){
	    this.innerHTML = "Close";
	    classie.add(wrapper, 'opened-nav');
	  }
	  else{
	    this.innerHTML = "Menu";
		classie.remove(wrapper, 'opened-nav');
	  }
	  open = !open;
	}
	function closeWrapper(){
		classie.remove(wrapper, 'opened-nav');
	}

	var container = document.getElementById('menu-container');
	var menu = new CircularMenu(container);
	menu.addItem('aa', 'AAAAAAAAAAAAAAA');
	menu.addItem('bb', 'BBBBBBBBBBBBBBB');
	menu.addItem('cc', 'CCCCCCCCCCCCCCC');
	menu.addItem('dd', 'DDDDDDDDDDDDDDD');
	menu.addItem('ee', 'EEEEEEEEEEEEEEE');
	menu.addItem('ff', 'FFFFFFFFFFFFFFF');
	// menu.addItem('gg', 'GGGGGGGGGGGGGGG');
	// menu.addItem('hh', 'HHHHHHHHHHHHHHH');
	// menu.addItem('gg', 'GGGGGGGGGGGGGGG');
	// menu.addItem('hh', 'HHHHHHHHHHHHHHH');
	// menu.addItem('gg', 'GGGGGGGGGGGGGGG');
	// menu.addItem('hh', 'HHHHHHHHHHHHHHH');
	menu.render();

})();
