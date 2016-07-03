class Menu {
	constructor(options) {
		this.el = options.el;
		this.items = document.querySelectorAll('.menu__item');

		this._initEvents();
		this._addRemoveButtons();
	}

	_initEvents () {
		this.el.addEventListener('click', this._onMenuClick.bind(this));
	}


	_onMenuClick (event) {
		let isItemClick = false;
		if (event.target.classList.contains('menu__remove-button')) {
			isItemClick = true;
			this._deleteElement(event);
		} else if (event.target.classList.contains('menu__item')) {
			isItemClick = true;
			this._onMenuItemClick(event);
		}

		if (!isItemClick) {
			this.el.classList.toggle('menu_open');
		}
	}

	_onMenuItemClick (event) {
		console.log(event.target);
	}

	_addRemoveButtons() {
		Array.prototype.forEach.call(this.items, function(item) {
			let removeButton = document.createElement('button');
			removeButton.classList.add('menu__remove-button');
			removeButton.innerHTML = '✖';
			item.appendChild(removeButton);
		})
	}

	_deleteElement (event) {
		event.target.parentNode.remove();
	}

}
