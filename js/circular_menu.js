'use strict';
(function(exports) {
  function CircularMenu(container) {
    this.container = container;
    this.marginAngle = 2;
    this.items = [];
    this.totalAngle = 210;
  }

  var proto = CircularMenu.prototype;

  Object.defineProperty(proto, 'opened', {
    get: function() {
      return this.container.classList.contains('opened');
    }
  });

  proto.addItem = function(id, text, classLists) {
    this.items.push({
      'id': id,
      'text': text,
      'classLists': Array.isArray(classLists) ? classLists : (classLists ? [classLists] : [])
    });
  };

  proto.removeItem = function(id) {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        this.items.splice(i, 1);
        break;
      }
    }
  };

  proto.render = function() {
    this._renderedCount = this.items.length < 4 ? 4 : this.items.length;
    this._fanAngle = this.totalAngle / this._renderedCount - this.marginAngle;
    this._skewAngle = 90 - this._fanAngle;
    this._paddingAngle = (this.totalAngle - 180) / 2;
    this._innerRotate = (90 - this._fanAngle / 2);
    this._renderContainer();
    this._centerIndex = Math.floor(this.items.length / 2);
    this.items.forEach(this._renderItem.bind(this));
  };

  proto._renderContainer = function() {
    this.container.classList.add('circular-menu');
    this._menuContainer = this.container;
  };

  proto._renderItem = function(item) {
    if (!item.id) {
      item.ui = {};
      return;
    }

    var menu = document.createElement('div');
    menu.role = 'menu';
    menu.classList.add('circular-menu-item');
    item.classLists.forEach(function(cls) {
      menu.classList.add(cls);
    });
    menu.id = item.id;
    var itemAngle = this._centerIndex * (this._fanAngle + this.marginAngle)
                        - this._paddingAngle;
    menu.style.transform = 'rotate(' + itemAngle + 'deg) ' +
                           'skew(' + this._skewAngle + 'deg)';

    var anchor = document.createElement('a');
    anchor.textContent = item.text || '';
    anchor.classList.add('circular-menu-item-anchor');
    anchor.style.transform = 'skew(-' + this._skewAngle + 'deg) ' +
                             'rotate(-' + this._innerRotate + 'deg)';

    menu.appendChild(anchor);
    this._menuContainer.appendChild(menu);
    item.ui = {
      'menu': menu
    };
  };

  proto._enlargeMenus = function() {
    this.container.classList.add('opening');
    var transition = this._getTransition(this.container, 'transform');
    return transition ? transition.finished : Promise.resolve();
  };

  proto._rotateMenus = function(opening) {
    return Promise.all(this.items.map(function(item, idx) {
      var menu = item.ui.menu;
      if (!menu) {
        return;
      }
      var angle;
      if (opening) {
        angle = idx * (this._fanAngle + this.marginAngle) - this._paddingAngle;
        angle = angle > 270 ? angle - 360 : angle;
        console.log(idx, angle);
      } else {
        angle = this._centerIndex * (this._fanAngle + this.marginAngle)
                    - this._paddingAngle;
      }
      menu.style.transform = 'rotate(' + angle + 'deg) ' +
                             'skew(' + this._skewAngle + 'deg)';

      var transition = this._getTransition(menu, 'transform');
      return transition ? transition.finished : Promise.resolve();
    }.bind(this)));
  };

  proto._shrinkMenus = function() {
    this.container.classList.remove('opening');
    this.container.classList.remove('opened');
    var transition = this._getTransition(this.container, 'transform');
    return transition ? transition.finished : Promise.resolve();
  };

  proto._getTransition = function(element, attr) {
    return element.getAnimations ? element.getAnimations().find(function(animation) {
      return animation.transitionProperty === attr;
    }) : null;
  };

  proto.open = function() {
    return new Promise(function(resolve, reject) {
      var reset = function() {
        this._shrinkMenus();
        this._rotateMenus(false);
        reject();
      }.bind(this);
      this._enlargeMenus()
        .then(this._rotateMenus.bind(this, true), reset)
        .then(function() {
          this.container.classList.remove('opening');
          this.container.classList.add('opened');
          resolve();
        }.bind(this), reset)
        .catch(function(e) {
          console.error(e);
          reject();
        });
    }.bind(this));
  };

  proto.close = function() {
    return new Promise(function(resolve, reject) {
      var reset = function() {
        this._shrinkMenus();
        this._rotateMenus(false);
        reject();
      }.bind(this);
      this._rotateMenus(false)
        .then(this._shrinkMenus.bind(this), reset)
        .then(function() {
          resolve();
        }, reset)
        .catch(function(e) {
          console.error(e);
          reject();
        });
    }.bind(this));
  };

  exports.CircularMenu = CircularMenu;

})(window);