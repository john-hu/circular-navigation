'use strict';
(function(exports) {
  var MAGIC_ROTATION_FACTOR = 0.25;
  function CircularMenu(container, marginAngle) {
    this.container = container;
    this.marginAngle = marginAngle || 0;
    this.items = [];
  }

  var proto = CircularMenu.prototype;

  proto.addItem = function(id, text, classLists) {
    this.items.push({
      'id': id,
      'text': text,
      'classLists': classLists || []
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
    this._fanAngle = 360 / this._renderedCount - this.marginAngle;
    this._skewAngle = 90 - this._fanAngle;
    var rotateRatio = (this._renderedCount  - 2) * MAGIC_ROTATION_FACTOR;
    this._innerRotate = (this._fanAngle + this.marginAngle) * rotateRatio;
    this._renderContainer();
    this.items.forEach(this._renderItem.bind(this));
  };

  proto._renderContainer = function() {
    this.container.classList.add('circular-menu');
    this._menuContainer = this.container;
  };

  proto._renderItem = function(item, idx) {
    var menu = document.createElement('div');
    menu.role = 'menu';
    menu.classList.add('circular-menu-item');
    item.classLists.forEach((cls) => {
      menu.classList.add(cls);
    });
    menu.id = item.id;
    var itemAngle = 90 + (idx - 0.5) * (this._fanAngle) +
                         this.marginAngle * idx;
    menu.style.transform = 'rotate(' + itemAngle + 'deg) ' +
                           'skew(' + this._skewAngle + 'deg)';

    var anchor = document.createElement('a');
    anchor.textContent = item.text;
    anchor.classList.add('circular-menu-item-anchor');
    anchor.style.transform = 'skew(-' + this._skewAngle + 'deg) ' +
                             'rotate(-' + this._innerRotate + 'deg) scale(1)';

    menu.appendChild(anchor);
    this._menuContainer.appendChild(menu);
  };

  exports.CircularMenu = CircularMenu;

})(window);