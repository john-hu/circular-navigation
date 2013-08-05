(function(){

	var items = document.querySelectorAll('li'),
    button = document.getElementById('cn-button'),
    wrapper = document.getElementById('cn-wrapper');

    var transEndEventNames = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd otransitionend',
        'msTransition': 'MSTransitionEnd',
        'transition': 'transitionend'
    }, 
    transitionEnd = transEndEventNames[Modernizr.prefixed('transition')];

	//open and close menu when the button is clicked
	var open = false;
	button.addEventListener('click', handler, false);
	button.addEventListener('focus', handler, false);

	function handler(e){
	  if (!e) var e = window.event;
	  e.preventDefault;
	  if(!open){
	    open = true;
	    this.innerHTML = "Close";
	    [].forEach.call(items, function(item){
	    	classie.add(item, 'opened-item');
	    	classie.remove(item, 'closed-item');
		  	item.removeEventListener(transitionEnd, closeWrapper, false);
		});
	    classie.add(wrapper, 'opened-nav');
	  }
	  else{
	    open = false;
	    this.innerHTML = "Menu";
	    [].forEach.call(items, function(item){
	    	classie.add(item, 'closed-item');
	    	classie.remove(item, 'opened-item');
		  	item.addEventListener(transitionEnd, closeWrapper, false);
		});	
	  }
	}
	function closeWrapper(){
		classie.remove(wrapper, 'opened-nav');
	}

})();
