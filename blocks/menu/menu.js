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
			this.data = options.data;

			this.render();
			this.list = this.el.querySelector('menu__list');
			this._initEvents();
		}

		/**
		* @param  {HTMLElement} item
		*/
		removeItem (item) {
			let index = parseInt(item.parentNode.dataset.index);
			this.trigger('remove', {
				index
			});
			item.parentNode.remove();
		}

		/**
		* @param {HTMLElement} item
		*/
		pickItem(item) {
			let pickedItem = item;
			if (!item.classList.contains('menu__item')) {
				pickedItem = item.parentNode;
			}
			this.trigger('pick', {
				name: pickedItem.firstChild.textContent,
				quantity: pickedItem.childNodes[1].textContent
			});
		}

		openMenu() {
			this.el.classList.toggle('menu_open');
		}

		_initEvents () {
			this.el.addEventListener('click', this._onClick.bind(this));
		}

		get _template() {
			return document.querySelector('#menu').innerHTML;
		}

		render() {
			let templateEngine = window.templateEngine;
			this.el.innerHTML = templateEngine(this._template, this.data);
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
