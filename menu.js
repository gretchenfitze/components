(function () {
	'use strict';

	/**
	 * @class Menu
	 */
	class Menu {
		/**
		 * @constructor
		 * @param	{Object} options
		 * @param	{HTMLElement} options.el
		 */
		constructor(options) {
			this.el = options.el;
			this.items = this.el.querySelectorAll('.menu__item');
			this.list = this.el.querySelector('menu__list');

			this._initEvents();
			this._addRemoveButtons();
		}

		_addRemoveButtons() {
			Array.prototype.forEach.call(this.items, function(item) {
				let removeButton = document.createElement('button');
				removeButton.classList.add('menu__remove-button');
				removeButton.dataset.action = 'remove';
				removeButton.innerHTML = '✖';
				item.appendChild(removeButton);
			});
		}

		/**
		* @param  {HTMLElement} item
		*/
		removeItem (item) {
			let index = +item.parentNode.dataset.index;
			this.trigger('remove', {
				index
			});
			this.list.removeChild(item.parentNode);
		}

		/**
		* @param {HTMLElement} item
		*/
		pickItem(item) {
			this.trigger('pick', {
				href: item.getAttribute('href'),
				anchor: item.textContent
			});
		}

		openMenu() {
			this.el.classList.toggle('menu_open');
		}

		_initEvents () {
			this.el.addEventListener('click', this._onClick.bind(this));
		}

		/**
		 * @param  {Event} event
		 */
		_onClick (event) {
			event.preventDefault();
			let item = event.target;

			switch (item.dataset.action) {
			case 'remove':
				this.removeItem(item);
				break;

			case 'pick':
				this.pickItem(item);
				break;

			case 'open':
				this.openMenu();
				break;
			}
		}

		/**
		 * @param  {string} name event type
		 * @param  {Object} data event object
		 */
		trigger(name, data) {
			let widgetEvent = new CustomEvent(name, {
				bubbles: true,
				detail: data
			});

			this.el.dispatchEvent(widgetEvent);
			console.log(name, data);
		}
	}

	window.Menu = Menu;
})(window);
